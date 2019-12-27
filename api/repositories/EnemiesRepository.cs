using System;
using System.Collections.Generic;
using System.Linq;
using api.models;
using HotChocolate;
using MongoDB.Driver;

namespace api.repositories
{
    public class EnemiesRepository
    {
        private IMongoCollection<Enemy> EnemiesCollection { get; }
        
        public EnemiesRepository([Service] DevArenaRepository devArenaRepository)
        {
            EnemiesCollection = devArenaRepository.DevArenaDatabase.GetCollection<Enemy>("enemies");
        }

        public Enemy GetEnemy(Guid id)
        {
            return EnemiesCollection.AsQueryable().FirstOrDefault(x => x.Id == id);
        }

        public Enemy AddEnemy(string name, int hp, int minDmg, int maxDmg, double attackSpeed, List<string> quotes, string avatarUrl)
        {
            var newEnemy = new Enemy
            {
                Id = Guid.NewGuid(),
                Name = name,
                Hp = hp,
                Damage = new Damage
                {
                    Max = maxDmg,
                    Min = minDmg
                },
                AttackSpeed = attackSpeed,
                Quotes = quotes,
                AvatarUrl = avatarUrl
            };
            EnemiesCollection.InsertOne(newEnemy);
            return newEnemy;
        }
    }
}
