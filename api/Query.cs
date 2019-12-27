using System;
using System.Collections.Generic;
using api.models;
using api.repositories;
using HotChocolate;
    
namespace api
{
    public class Query
    {
        public List<Clothing> GetAllClothing([Service] ClothingRepository clothingRepository)
        {
            return clothingRepository.GetAllClothing();
        }
        public List<Clothing> GetClothing(List<Guid> ids, [Service] ClothingRepository clothingRepository)
        {
            return clothingRepository.GetClothing(ids);
        }

        public List<Developer> GetAllDevelopers([Service] DevelopersRepository developersRepository)
        {
            return developersRepository.GetAllDevelopers();
        }
    }
}
