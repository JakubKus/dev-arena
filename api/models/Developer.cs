using System;

namespace api.models
{
    public class Developer
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public double Price { get; set; }
        public int Hp { get; set; }
        public Damage Damage { get; set; }
        public string AvatarUrl { get; set; }
        public string WeaponUrl { get; set; }
    }
}
