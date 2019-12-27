using System;

namespace api.models
{
    public class Developer
    {
        public Guid Id { get; set; }
        public string Fullname { get; set; }
        public double Price { get; set; }
        public int Hp { get; set; }
        public Damage Damage { get; set; }
        public string AvatarUrl { get; set; }
        public string WeaponUrl { get; set; }
    }

    public class Damage
    {
        public int Min { get; set; }
        public int Max { get; set; }
    }
}
