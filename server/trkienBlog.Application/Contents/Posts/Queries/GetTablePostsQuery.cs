using MediatR;
using trkienBlog.Application.Contents.Posts;
using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Application.Contents.Topics.Services.Interfaces;
using trkienBlog.Application.FileStorages.Services;

namespace trkienBlog.Application.Contents.Posts.Queries
{
        public sealed record GetTablePostsQuery() : IRequest<IReadOnlyList<PostTableDto>>;
        public sealed class GetTablePostsQueryHandler : IRequestHandler<GetTablePostsQuery, IReadOnlyList<PostTableDto>>
        {
                private readonly IPostRepository _postRepo;
                private readonly IFileUrlBuilder _urlBuilder;
                private readonly ITopicService _topicService;
                public GetTablePostsQueryHandler(
                        IPostRepository postRepo ,
                        IFileUrlBuilder urlBuilder,
                        ITopicService topicService
                ){
                        _postRepo = postRepo;
                        _urlBuilder = urlBuilder;
                        _topicService = topicService;
                }

                public async Task<IReadOnlyList<PostTableDto>> Handle(GetTablePostsQuery query, CancellationToken cancellation)
                {
                        var posts = await _postRepo.GetTableAsync(cancellation);

                        var topicIds = posts.Select(x => x.TopicId).ToList();
                        var topicLookupDict = await _topicService.DictLookupAsync(topicIds, cancellation);

                        foreach(var p in posts)
                        {
                               if(p.ThumbnailKey is not null)
                               {
                                        p.ThumbnailUrl = _urlBuilder.Build(p.ThumbnailKey);
                               }

                               if(topicLookupDict.TryGetValue(p.TopicId, out var lookup))
                               {
                                        p.Topic = lookup;
                               }
                        }

                        return posts;
                }
        }
}
