using AutoMapper;
using trkienBlog.Application.Contents.Posts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Infrastructure.Persistence.Repositories
{
        public sealed class PostRepository : IPostRepository
        {
                private readonly AppDbContext _db;
                private readonly IConfigurationProvider _mapperConfig;
                public PostRepository(AppDbContext db, IConfigurationProvider mapperConfig)
                {
                        _db = db;       
                        _mapperConfig = mapperConfig;   
                }

                public async Task AddAsync(Post post, CancellationToken cancellation)
                {
                        _db.Posts.Add(post);    
                        await _db.SaveChangesAsync(cancellation);   
                }
        }
}
