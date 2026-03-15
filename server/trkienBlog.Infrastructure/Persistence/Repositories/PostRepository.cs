using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using trkienBlog.Application.Contents.Posts;
using trkienBlog.Application.Contents.Posts.Contracts;
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

                #region GET
                public async Task<IReadOnlyList<PostTableDto>> GetTableAsync(CancellationToken cancellation)
                {
                        return await _db.Posts.AsNoTracking()
                                .ProjectTo<PostTableDto>(_mapperConfig)
                                .ToListAsync(cancellation);
                }
                #endregion

                #region Create
                public async Task AddAsync(Post post, CancellationToken cancellation)
                {
                        _db.Posts.Add(post);    
                        await _db.SaveChangesAsync(cancellation);   
                }
                #endregion
        }
}
