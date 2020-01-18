using System.Collections.Generic;
using api.models;
using api.repositories;
using HotChocolate;

namespace api
{
    public class Mutation
    {
        public Clothing AddClothing(string name, double price, string imageUrl, BodyPart bodyPart, [Service] ClothingRepository clothingRepository)
        {
            return clothingRepository.AddClothing(name, price, imageUrl, bodyPart);
        }

        public Developer AddDeveloper(string fullName, double price, int hp, int minDmg, int maxDmg, string avatarUrl,
            string weaponUrl, [Service] DevelopersRepository developersRepository)
        {
            return developersRepository.AddDeveloper(fullName, price, hp, minDmg, maxDmg, avatarUrl, weaponUrl);
        }

        public Enemy AddEnemy(string name, int hp, int minDmg, int maxDmg, double attackSpeed, List<string> quotes, string avatarUrl,
            [Service] EnemiesRepository enemiesRepository)
        {
            return enemiesRepository.AddEnemy(name, hp, minDmg, maxDmg, attackSpeed, quotes, avatarUrl);
        }

        public HighScore AddHighScore(string nickname, double value, ScoreCategory scoreCategory, [Service] HighScoresRepository highScoresRepository)
        {
            return highScoresRepository.AddHighScore(nickname, value, scoreCategory);
        }
    }
}
