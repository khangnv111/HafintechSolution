namespace Hafintech.API.Models
{
    public class Comment
    {
        public long? dclId { get; set; }
        public int status { get; set; }
        public string content { get; set; }
        public long? fromAccId { get; set; }
        public long? toAccId { get; set; }
    }
}