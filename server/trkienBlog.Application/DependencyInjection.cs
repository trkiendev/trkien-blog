using Microsoft.Extensions.DependencyInjection;
using trkienBlog.Application.Contents.Tags.Repositories;
using trkienBlog.Application.Contents.Tags.Services;
using trkienBlog.Application.Contents.Topics.Services;
using trkienBlog.Application.Contents.Topics.Services.Interfaces;
using trkienBlog.Application.Users.Services;
using trkienBlog.Application.Users.Services.Interfaces;

namespace trkienBlog.Application
{
        public static class DependencyInjection
        {
                public static IServiceCollection AddApplication(this IServiceCollection services)
                {
                        services.AddScoped<IUserService, UserService>();
                        services.AddScoped<ITopicService, TopicServices>();
                        services.AddScoped<ITagService, TagService>();

                        return services;
                }
        }
}
