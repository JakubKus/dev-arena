namespace api.models
{
    public class DbSettings : IDbSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IDbSettings
    {
        string ConnectionString { get; }
        string DatabaseName { get; }
    }
}
 