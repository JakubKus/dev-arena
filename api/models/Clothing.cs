using System;

namespace api.models
{
    public class Clothing
    {
        public Guid Id { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
        public BodyPart BodyPart { get; set; }
    }
    
    public enum BodyPart
    {
        Top,
        Middle,
        Bottom
    }
}
