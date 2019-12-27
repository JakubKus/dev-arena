using System;
using System.Collections.Generic;
using api.models;
using api.repositories;
using HotChocolate;
    
namespace api
{
    public class Query
    {
        public List<ShopItem> GetShopItems(List<Guid> ids, [Service] ShopItemsRepository shopItemsRepository)
        {
            return shopItemsRepository.GetShopItems(ids);
        }
    }
}
