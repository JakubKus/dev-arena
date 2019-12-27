using api.models;
using api.repositories;
using HotChocolate;

namespace api
{
    public class Mutation
    {
        public Clothing AddClothing(double price, string imageUrl, BodyPart bodyPart, [Service] ClothingRepository clothingRepository)
        {
            return clothingRepository.AddClothing(price, imageUrl, bodyPart);
        }

        public Developer AddDeveloper(string fullname, double price, int hp, int minDmg, int maxDmg, string avatarUrl,
            string weaponUrl, [Service] DevelopersRepository developersRepository)
        {
            return developersRepository.AddDeveloper(fullname, price, hp, minDmg, maxDmg, avatarUrl, weaponUrl);
        }
    }
}
