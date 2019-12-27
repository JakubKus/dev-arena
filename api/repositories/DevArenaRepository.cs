using api.models;
using HotChocolate;
using MongoDB.Driver;

namespace api.repositories
{
    public class DevArenaRepository
    {
        private IMongoClient DevArenaClient { get; }
        public IMongoDatabase DevArenaDatabase { get; }
        
        public DevArenaRepository([Service] IDbSettings dbSettings)
        {
            DevArenaClient = new MongoClient(dbSettings.ConnectionString);
            DevArenaDatabase = DevArenaClient.GetDatabase(dbSettings.DatabaseName);
        }
    }
}
