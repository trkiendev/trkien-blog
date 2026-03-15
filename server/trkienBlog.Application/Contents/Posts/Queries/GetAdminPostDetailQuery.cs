using MediatR;
using trkienBlog.Application.Contents.Posts.Contracts;

namespace trkienBlog.Application.Contents.Posts.Queries
{
        public sealed record GetAdminPostDetailQuery(Guid Id) : IRequest<AdminPostDetailDto?>;
        public sealed class GetAdminPostDetailQueryHanlder : IRequestHandler<GetAdminPostDetailQuery, AdminPostDetailDto?>
        {
                private readonly IPostRepository _postRepo;
                public GetAdminPostDetailQueryHanlder(IPostRepository postRepo)
                {
                        _postRepo = postRepo;   
                }

                public async Task<AdminPostDetailDto?> Handle(GetAdminPostDetailQuery query, CancellationToken cancellation)
                {
                        var detail = await _postRepo.GetDetailByIdAsync(query.Id, cancellation);
                        return detail;
                }

        }
}
