namespace BookApi.Modules
{
    public class Quote
    {
        public int Id {get; set;}
        public required String  Text {get; set;}
        public required String Author {get; set;}
    }
}