using api.models;
using api.repositories;
using HotChocolate;

namespace api
{
    public class Mutation
    {
        public ShopItem AddShopItem(string name, double price, string imageUrl, [Service] ShopItemsRepository shopItemsRepository)
        {
            return shopItemsRepository.AddShopItem(name, price, imageUrl);
        }
    }
}
