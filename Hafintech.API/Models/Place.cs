namespace Hafintech.API.Models
{
    public class PlaceLoading
    {
        public int placeLoadingId
        {
            get
            {
                return PlaceLoadingID;
            }
            set
            {
                PlaceLoadingID = value;
            }
        }
        public string placeCode
        {
            get
            {
                return PlaceCode;
            }
            set
            {
                PlaceCode = value;
            }
        }
        public string placeName
        {
            get
            {
                return PlaceName;
            }
            set
            {
                PlaceName = value;
            }
        }

        public int PlaceLoadingID { get; set; }
        public string PlaceCode { get; set; }
        public string PlaceName { get; set; }
        public string countryCode { get; set; }
    }

    public class PlaceUnLoading
    {
        public int plcUnloadingID
        {
            get
            {
                return PlaceUnloadingID;
            }
            set
            {
                PlaceUnloadingID = value;
            }
        }
        public string placeCode
        {
            get
            {
                return PlaceCode;
            }
            set
            {
                PlaceCode = value;
            }
        }
        public string placeName
        {
            get
            {
                return PlaceName;
            }
            set
            {
                PlaceName = value;
            }
        }

        public int PlaceUnloadingID { get; set; }
        public string PlaceCode { get; set; }
        public string PlaceName { get; set; }
    }
}