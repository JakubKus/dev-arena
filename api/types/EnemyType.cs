using api.models;
using HotChocolate.Types;

namespace api.types
{
    public class EnemyType : ObjectType<Enemy>
    {
        protected override void Configure(IObjectTypeDescriptor<Enemy> descriptor)
        {
            descriptor
                .Field(x => x.Id)
                .Description("Unique enemy id")
                .Type<NonNullType<IdType>>();
        
            descriptor
                .Field(x => x.Name)
                .Description("Enemy name")
                .Type<NonNullType<StringType>>();
        
            descriptor
                .Field(x => x.Hp)
                .Description("Enemy hit points")
                .Type<NonNullType<IntType>>();
        
            descriptor
                .Field(x => x.Damage)
                .Description("Amount of damage dealt by the enemy")
                .Type<NonNullType<DamageType>>();
        
            descriptor
                .Field(x => x.AttackSpeed)
                .Description("Number of attacks per second")
                .Type<NonNullType<FloatType>>();
        
            descriptor
                .Field(x => x.Quotes)
                .Description("Enemy attack quotes")
                .Type<NonNullType<ListType<NonNullType<StringType>>>>();
        
            descriptor
                .Field(x => x.AvatarUrl)
                .Description("Enemy avatar url")
                .Type<NonNullType<UrlType>>();
        }
    }
}
