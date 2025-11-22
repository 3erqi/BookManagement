using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookApi.Data;
using BookApi.Models;
using BookApi.DTOs;
using BookApi.Services;

namespace BookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AuthService _authService;

    public AuthController(AppDbContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    // POST: api/auth/register
    [HttpPost("register")]
    public async Task<ActionResult<string>> Register(UserRegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest("Username already exists.");

        // Use BCrypt hash only
        var hash = _authService.CreatePasswordHash(dto.Password);

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = hash
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("User registered successfully.");
    }

    // POST: api/auth/login
    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(UserLoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == dto.Username);

        if (user == null)
            return BadRequest("User not found");

        // Verify using BCrypt
        if (!_authService.VerifyPassword(dto.Password, user.PasswordHash))
            return BadRequest("Incorrect password");

        var token = _authService.CreateToken(user);

        return Ok(token);
    }
}
