using System;
using System.Collections.Generic;

namespace api.models
{
    public class Enemy
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Hp { get; set; }
        public Damage Damage { get; set; }
        public double AttackSpeed { get; set; }
        public List<string> Quotes { get; set; }
        public string AvatarUrl { get; set; }
    }
}
