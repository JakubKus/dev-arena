using HotChocolate.Types;

namespace api.types
{
    public class MutationType : ObjectType<Mutation>
    {
        protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
        {
            descriptor
                .Field(x => x.AddShopItem(default, default, default, default))
                .Argument(
                    "name",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<StringType>>())
                .Argument(
                    "price",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<FloatType>>())
                .Argument(
                    "imageUrl",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<UrlType>>());
        }
    }
}
