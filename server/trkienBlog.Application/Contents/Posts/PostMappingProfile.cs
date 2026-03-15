using AutoMapper;
using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Posts
{
        public sealed class PostMappingProfile : Profile
        {
                public PostMappingProfile() {
                        CreateMap<Post, PostDto>();

                        CreateMap<Post, PostTableDto>();
                }
        }
}
