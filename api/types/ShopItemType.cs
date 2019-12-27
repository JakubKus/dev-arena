using api.models;
using HotChocolate.Types;

namespace api.types
{
    public class ShopItemType : ObjectType<ShopItem>
    {
        protected override void Configure(IObjectTypeDescriptor<ShopItem> descriptor)
        {
            descriptor
                .Field(x => x.Id)
                .Description("Unique id of the shop item")
                .Type<NonNullType<IdType>>();
        
            descriptor
                .Field(x => x.Name)
                .Description("Name of the shop item")
                .Type<NonNullType<StringType>>();
        
            descriptor
                .Field(x => x.Price)
                .Description("The price of the shop item")
                .Type<NonNullType<FloatType>>();
        
            descriptor
                .Field(x => x.ImageUrl)
                .Description("Link to the shop item image")
                .Type<NonNullType<UrlType>>();
        }
    }
}
