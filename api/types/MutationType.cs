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
            
            descriptor
                .Field(x => x.AddDeveloper(default, default, default, default, default, default, default, default))
                .Argument(
                    "fullname",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<StringType>>())
                .Argument(
                    "price",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<FloatType>>())
                .Argument(
                    "hp",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<IntType>>())
                .Argument(
                    "minDmg",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<IntType>>())
                .Argument(
                    "maxDmg",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<IntType>>())
                .Argument(
                    "avatarUrl",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<UrlType>>())
                .Argument(
                    "weaponUrl",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<UrlType>>());
        }
    }
}
