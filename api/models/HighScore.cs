using System;

namespace api.models
{
    public class HighScore
    {
        public Guid Id { get; set; }
        public string Nickname { get; set; }
        public double Value { get; set; }
        public DateTime EstablishedOn { get; set; }
        public ScoreCategory Category { get; set; }
    }

    public enum ScoreCategory
    {
        Combo,
        WonFights
    }
}
