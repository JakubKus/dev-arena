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

            descriptor
                .Field(x => x.GetDeveloper(default, default))
                .Argument(
                    "id",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<IdType>>());

            descriptor
                .Field(x => x.GetEnemy(default, default))
                .Argument(
                    "id",
                    argumentDescriptor => argumentDescriptor.Type<NonNullType<IdType>>());
        }
    }
}
