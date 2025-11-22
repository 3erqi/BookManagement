namespace BookApi.Models
{
    public class User
    {
        public int Id {get; set;}
        public required String Email {get; set;}
        public required String PasswordHash {get; set;}
    }
}