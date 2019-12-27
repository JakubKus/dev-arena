using System;

namespace api.models
{
    public class ShopItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
