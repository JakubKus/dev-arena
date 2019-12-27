using System;
using System.Collections.Generic;
using api.models;
using HotChocolate;
using MongoDB.Driver;

namespace api.repositories
{
    public class ShopItemsRepository
    {
        private IMongoCollection<ShopItem> ShopItemsCollection { get; }
       
        public ShopItemsRepository([Service] DevArenaRepository devArenaRepository)
        {
            ShopItemsCollection = devArenaRepository.DevArenaDatabase.GetCollection<ShopItem>("shop_items");
        }
        
        public List<ShopItem> GetShopItems(List<Guid> ids)
        {
            return ShopItemsCollection.Find(x => ids.Contains(x.Id)).ToList();
        }
        
        public ShopItem AddShopItem(string name, double price, string imageUrl)
        {
            var newShopItem = new ShopItem
            {
                Id = Guid.NewGuid(),
                Name = name,
                Price = price,
                ImageUrl = imageUrl
            };
            ShopItemsCollection.InsertOne(newShopItem);
            return newShopItem;
        }
    }
}
