using System;
using System.Collections.Generic;
using System.Linq;
using api.models;
using HotChocolate;
using MongoDB.Driver;

namespace api.repositories
{
    public class DevelopersRepository
    {
        private IMongoCollection<Developer> DevelopersCollection { get; }

        public DevelopersRepository([Service] DevArenaRepository devArenaRepository)
        {
            DevelopersCollection = devArenaRepository.DevArenaDatabase.GetCollection<Developer>("developers");
        }

        public List<Developer> GetAllDevelopers()
        {
            return DevelopersCollection.Find(x => true).ToList();
        }

        public Developer GetDeveloper(Guid id)
        {
            return DevelopersCollection.AsQueryable().FirstOrDefault(x => x.Id == id);
        }

        public Developer AddDeveloper(string fullName, double price, int hp, int minDmg, int maxDmg, string avatarUrl, string weaponUrl)
        {
            var newDeveloper = new Developer
            {
                Id = Guid.NewGuid(),
                FullName = fullName,
                Price = price,
                Hp = hp,
                Damage = new Damage
                {
                    Min = minDmg,
                    Max = maxDmg
                },
                AvatarUrl = avatarUrl,
                WeaponUrl = weaponUrl
            };
            DevelopersCollection.InsertOne(newDeveloper);
            return newDeveloper;
        }
    }
}
