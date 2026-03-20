using MediatR;
using trkienBlog.Application.Contents.Posts;
using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Application.Contents.Tags;
using trkienBlog.Application.FileStorages.Services;

namespace trkienBlog.Application.Contents.Posts.Queries
{
        public sealed record GetAdminPostDetailQuery(Guid Id) : IRequest<AdminPostDetailDto?>;
        public sealed class GetAdminPostDetailQueryHanlder : IRequestHandler<GetAdminPostDetailQuery, AdminPostDetailDto?>
        {
                private readonly IPostRepository _postRepo;
                private readonly ITagRepository _tagRepo;
                private readonly IFileUrlBuilder _urlBuilder;
                public GetAdminPostDetailQueryHanlder(
                        IPostRepository postRepo,
                        ITagRepository tagRepo,
                        IFileUrlBuilder urlBuilder
                )
                {
                        _postRepo = postRepo;
                        _tagRepo = tagRepo;
                        _urlBuilder = urlBuilder;
                }

                public async Task<AdminPostDetailDto?> Handle(GetAdminPostDetailQuery query, CancellationToken cancellation)
                {
                        var detail = await _postRepo.GetDetailByIdAsync(query.Id, cancellation);
                        if (detail is null)
                                return null;

                        // TagLookups
                        var tagIds = detail.TagIds.Distinct().ToList();
                        detail.TagLookups = await _tagRepo.ListLookupByIdsAsync(tagIds, cancellation);

                        // Thumbnail
                        if(detail.ThumbnailKey is not null)
                        {
                                detail.ThumbnailUrl = _urlBuilder.Build(detail.ThumbnailKey);
                        }

                        return detail;
                }

        }
} 
