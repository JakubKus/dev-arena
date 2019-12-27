using System;
using System.Collections.Generic;
using api.models;
using api.repositories;
using HotChocolate;
    
namespace api
{
    public class Query
    {
        public List<ShopItem> GetAllShopItems([Service] ShopItemsRepository shopItemsRepository)
        {
            return shopItemsRepository.GetAllShopItems();
        }
        public List<ShopItem> GetShopItems(List<Guid> ids, [Service] ShopItemsRepository shopItemsRepository)
        {
            return shopItemsRepository.GetShopItems(ids);
        }

        public List<Developer> GetAllDevelopers([Service] DevelopersRepository developersRepository)
        {
            return developersRepository.GetAllDevelopers();
        }
    }
}
