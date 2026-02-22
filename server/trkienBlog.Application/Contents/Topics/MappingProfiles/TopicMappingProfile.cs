using trkienBlog.Domain.Entities;
using AutoMapper;
using trkienBlog.Application.Contents.Topics.Contracts;

namespace trkienBlog.Application.Contents.Topics.MappingProfiles
{
        public sealed class TopicProfile : Profile
        {
                public TopicProfile()
                {
                        CreateMap<Topic, TopicDto>()
                                .ForMember(d => d.imageUrl, opt => opt.Ignore());
                }
        }
}
