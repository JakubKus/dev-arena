using api.models;
using HotChocolate.Types;

namespace api.types
{
    public class DeveloperType : ObjectType<Developer>
    {
        protected override void Configure(IObjectTypeDescriptor<Developer> descriptor)
        {
            descriptor
                .Field(x => x.Id)
                .Description("Unique developer id")
                .Type<NonNullType<IdType>>();
        
            descriptor
                .Field(x => x.Fullname)
                .Description("Developer fullname")
                .Type<NonNullType<StringType>>();
        
            descriptor
                .Field(x => x.Price)
                .Description("Developer price")
                .Type<NonNullType<FloatType>>();
        
            descriptor
                .Field(x => x.Hp)
                .Description("Developer hit points")
                .Type<NonNullType<IntType>>();
        
            descriptor
                .Field(x => x.Damage)
                .Description("Amount of damage dealt by the developer")
                .Type<NonNullType<DamageType>>();
        
            descriptor
                .Field(x => x.AvatarUrl)
                .Description("Developer avatar url")
                .Type<NonNullType<UrlType>>();
        
            descriptor
                .Field(x => x.WeaponUrl)
                .Description("Developer weapon url")
                .Type<NonNullType<UrlType>>();
        }
    }
}
