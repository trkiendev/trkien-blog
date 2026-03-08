using AutoMapper;
using trkienBlog.Application.Contents.Tags.Contracts;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Application.Contents.Tags.MappingProfiles
{
        public sealed class TagMappingProfile : Profile
        {
                public TagMappingProfile() {
                        CreateMap<Tag, TagDto>();

                        CreateMap<Tag, TagBriefDto>();

                        CreateMap<Tag, TagTableDto>();
                }
        }
}
