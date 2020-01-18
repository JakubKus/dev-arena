using api.models;
using HotChocolate.Types;

namespace api.types
{
    public class HighScoreType : ObjectType<HighScore>
    {
        protected override void Configure(IObjectTypeDescriptor<HighScore> descriptor)
        {
            descriptor
                .Field(x => x.Id)
                .Description("Unique high score id")
                .Type<NonNullType<IdType>>();
        
            descriptor
                .Field(x => x.Nickname)
                .Description("Player nickname")
                .Type<NonNullType<StringType>>();
        
            descriptor
                .Field(x => x.Value)
                .Description("High score value")
                .Type<NonNullType<FloatType>>();
        
            descriptor
                .Field(x => x.EstablishedOn)
                .Description("High score establish date")
                .Type<NonNullType<DateTimeType>>();
        
            descriptor
                .Field(x => x.Category)
                .Description("High score category");
        }
    }

    public class ScoreCategoryType : EnumType<ScoreCategory>
    {
        protected override void Configure(IEnumTypeDescriptor<ScoreCategory> descriptor)
        {
            descriptor
                .Value(ScoreCategory.Combo)
                .Description("Fastest combo category");
            
            descriptor
                .Value(ScoreCategory.WonFights)
                .Description("Most won fights category");
        }
        
    }
}
