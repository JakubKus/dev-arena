using HotChocolate.Types;

namespace api.types
{
    public class QueryType : ObjectType<Query>
    {
        protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
        {
            descriptor
                .Field(x => x.GetShopItems(default, default))
                .Argument(
                    "ids",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<ListType<NonNullType<IdType>>>>());
        }
    }
}
