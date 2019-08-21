namespace Hafintech.API.Models
{
    public class Comment
    {
        public int dclId { get; set; }
        public int status { get; set; }
        public string content { get; set; }
        public int fromAccId { get; set; }
        public string toAccId { get; set; }
    }
}