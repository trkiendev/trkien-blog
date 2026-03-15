using Microsoft.Extensions.DependencyInjection;
using trkienBlog.Application.Auth.Services;
using trkienBlog.Application.Contents.Posts;
using trkienBlog.Application.Contents.Tags;
using trkienBlog.Application.Contents.Topics;
using trkienBlog.Application.FileStorage.Services;
using trkienBlog.Application.FileStorages.Services;
using trkienBlog.Application.Security;
using trkienBlog.Application.Users.Repositories;
using trkienBlog.Infrastructure.Auth.Services;
using trkienBlog.Infrastructure.FileStorage.Services;
using trkienBlog.Infrastructure.FileStorages.Services;
using trkienBlog.Infrastructure.Persistence.Repositories;
using trkienBlog.Infrastructure.Security;

namespace trkienBlog.Infrastructure
{
        public static class DependencyInjection
        {
                public static IServiceCollection AddInfrastructure(this IServiceCollection services)
                {
                        // Services
                        services.AddScoped<IPasswordHaser, BCryptPasswordHasher>();
                        services.AddScoped<ITokenService, JwtTokenService>();
                        services.AddScoped<IAuthService, AuthService>();
                        services.AddScoped<IFileStorageService, R2FileStorageService>();
                        services.AddScoped<IFileUrlBuilder, R2FileUrlBuilderService>();

                        // Repositories
                        services.AddScoped<IUserRepository, UserRepository>();
                        services.AddScoped<ITopicRepository, TopicRepository>();
                        services.AddScoped<ITagRepository, TagRepository>();
                        services.AddScoped<IPostRepository, PostRepository>();  

                        return services;
                }
        }
}
