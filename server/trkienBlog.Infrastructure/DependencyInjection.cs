using Microsoft.Extensions.DependencyInjection;
using trkienBlog.Application.Auth.Services;
using trkienBlog.Application.Security;
using trkienBlog.Application.Users.Repositories;
using trkienBlog.Infrastructure.Auth.Services;
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

                        // Repositories
                        services.AddScoped<IUserRepository, UserRepository>();


                        return services;
                }
        }
}
