using System;
using System.Collections.Generic;
using api.models;
using HotChocolate;
using MongoDB.Driver;

namespace api.repositories
{
    public class ClothingRepository
    {
        private IMongoCollection<Clothing> ClothingCollection { get; }
       
        public ClothingRepository([Service] DevArenaRepository devArenaRepository)
        {
            ClothingCollection = devArenaRepository.DevArenaDatabase.GetCollection<Clothing>("clothing");
        }
        
        public List<Clothing> GetAllClothing()
        {
            return ClothingCollection.Find(x => true).ToList();
        }
        
        public List<Clothing> GetClothing(List<Guid> ids)
        {
            return ClothingCollection.Find(x => ids.Contains(x.Id)).ToList();
        }
        
        public Clothing AddClothing(string name, double price, string imageUrl, BodyPart bodyPart)
        {
            var newClothing = new Clothing
            {
                Id = Guid.NewGuid(),
                Name = name,
                Price = price,
                ImageUrl = imageUrl,
                BodyPart = bodyPart
            };
            ClothingCollection.InsertOne(newClothing);
            return newClothing;
        }
    }
}
