using api.models;
using HotChocolate.Types;

namespace api.types
{
    public class DamageType : ObjectType<Damage>
    {
        protected override void Configure(IObjectTypeDescriptor<Damage> descriptor)
        {
            descriptor
                .Field(x => x.Min)
                .Description("Minimum amount of damage dealt")
                .Type<NonNullType<IntType>>();
            
            descriptor
                .Field(x => x.Max)
                .Description("Maximum amount of damage dealt")
                .Type<NonNullType<IntType>>();
        }
    }
}
