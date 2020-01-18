using System;
using System.Collections.Generic;
using api.models;
using HotChocolate;
using MongoDB.Driver;

namespace api.repositories
{
    public class HighScoresRepository
    {
        private IMongoCollection<HighScore> HighScoresCollection { get; }

        public HighScoresRepository([Service] DevArenaRepository devArenaRepository)
        {
            HighScoresCollection = devArenaRepository.DevArenaDatabase.GetCollection<HighScore>("highScores");
        }

        public List<HighScore> GetHighScoresOfCategory(ScoreCategory scoreCategory)
        {
            var highScoresOfCategory = HighScoresCollection.Find(x => x.Category == scoreCategory);
            if (scoreCategory == ScoreCategory.WonFights)
            {
                return highScoresOfCategory.SortByDescending(x => x.Value).ThenBy(x => x.EstablishedOn).ToList();
            }
            return highScoresOfCategory.SortBy(x => x.Value).ThenBy(x => x.EstablishedOn).ToList();
        }

        public HighScore AddHighScore(string nickname, double value, ScoreCategory scoreCategory)
        {
            var newHighScore = new HighScore
            {
                Id = Guid.NewGuid(),
                EstablishedOn = DateTime.Now,
                Nickname = nickname,
                Value = value,
                Category = scoreCategory
            };
            
            HighScoresCollection.InsertOne(newHighScore);
            var highScoresOfType = HighScoresCollection.Find(x => x.Category == scoreCategory);
            if (highScoresOfType.CountDocuments() < 6)
            {
                return newHighScore;
            }
            
            var toDelete = highScoresOfType.SortBy(x => x.Value).FirstOrDefault();
            if (scoreCategory == ScoreCategory.Combo)
            {
                toDelete = highScoresOfType.SortByDescending(x => x.Value).FirstOrDefault();
            }
             
            HighScoresCollection.DeleteOne(x => x.Id == toDelete.Id);
            return newHighScore;
        }
    }
}
