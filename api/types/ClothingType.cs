using api.models;
using HotChocolate.Types;

namespace api.types
{
    public class ClothingType : ObjectType<Clothing>
    {
        protected override void Configure(IObjectTypeDescriptor<Clothing> descriptor)
        {
            descriptor
                .Field(x => x.Id)
                .Description("Unique id of the clothing")
                .Type<NonNullType<IdType>>();
        
            descriptor
                .Field(x => x.Price)
                .Description("The price of the clothing")
                .Type<NonNullType<FloatType>>();
        
            descriptor
                .Field(x => x.ImageUrl)
                .Description("Link to the clothing image")
                .Type<NonNullType<UrlType>>();
        }
    }
    public class BodyPartType : EnumType<BodyPart>
    {
        protected override void Configure(IEnumTypeDescriptor<BodyPart> descriptor)
        {
            descriptor
                .Value(BodyPart.Top)
                .Description("Top clothing body part");

            descriptor
                .Value(BodyPart.Middle)
                .Description("Middle clothing body part");

            descriptor
                .Value(BodyPart.Bottom)
                .Description("Bottom clothing body part");
        }
    }
}
