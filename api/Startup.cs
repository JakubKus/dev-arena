using api.models;
using api.repositories;
using api.types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using HotChocolate.AspNetCore;
using HotChocolate;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace api
{
    public class Startup
    {
        private IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            MongoDefaults.GuidRepresentation = MongoDB.Bson.GuidRepresentation.Standard;
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<DbSettings>(Configuration.GetSection(nameof(DbSettings)));
            
            // If you need dependency injection with your query object add your query type as a services.
            services.AddSingleton<IDbSettings>(s => s.GetRequiredService<IOptions<DbSettings>>().Value);
            services.AddSingleton<DevArenaRepository>();
            services.AddSingleton<ClothingRepository>();
            services.AddSingleton<DevelopersRepository>();
            services.AddSingleton<EnemiesRepository>();
            services.AddSingleton<HighScoresRepository>();
            // enable InMemory messaging services for subscription support.
            // services.AddInMemorySubscriptionProvider();
            
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            // this enables you to use DataLoader in your resolvers.
            services.AddDataLoaderRegistry();

            // Add GraphQL Services
            services.AddGraphQL(sp => SchemaBuilder.New()
                // enable for authorization support
                // .AddDirectiveType<AuthorizeDirectiveType>()
                .AddServices(sp)
                .AddType<ClothingType>()
                .AddType<DeveloperType>()
                .AddType<EnemyType>()
                .AddType<HighScoreType>()
                .AddQueryType<QueryType>()
                .AddMutationType<MutationType>()
                .Create());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("AllowAnyOrigin");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // enable this if you want tu support subscription.
            // app.UseWebSockets();
            app.UseGraphQL();
            // enable this if you want to use graphiql instead of playground.
            // app.UseGraphiQL();
            app.UsePlayground();
        }
    }
}
