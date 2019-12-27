using HotChocolate.Types;

namespace api.types
{
    public class QueryType : ObjectType<Query>
    {
        protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
        {
            descriptor
                .Field(x => x.GetAllClothing(default));
            
            descriptor
                .Field(x => x.GetClothing(default, default))
                .Argument(
                    "ids",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<ListType<IdType>>>());

            descriptor
                .Field(x => x.GetAllDevelopers(default));
        }
    }
}
