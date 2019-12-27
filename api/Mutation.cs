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

        public Developer AddDeveloper(string fullname, double price, int hp, int minDmg, int maxDmg, string avatarUrl,
            string weaponUrl, [Service] DevelopersRepository developersRepository)
        {
            return developersRepository.AddDeveloper(fullname, price, hp, minDmg, maxDmg, avatarUrl, weaponUrl);
        }
    }
}
