using AutoMapper;
using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Topics
{
        public sealed class TopicProfile : Profile
        {
                public TopicProfile()
                {
                        CreateMap<Topic, TopicDto>()
                                .ForMember(d => d.imageUrl, opt => opt.Ignore());

                        CreateMap<Topic, TopicLookupDto>();
                }
        } 
}
