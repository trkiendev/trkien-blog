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

                #region Validations 
                public async Task<bool> ExistByIdAsync(Guid id, CancellationToken cancellation)
                {
                        return await _db.Posts.AsNoTracking()
                                .AnyAsync(x => x.Id == id, cancellation);
                }
                #endregion

                #region GET
                // Entities
                public async Task<Post?> GetByIdAsync(Guid id, CancellationToken cancellation)
                {
                        return await _db.Posts.FirstOrDefaultAsync(x => x.Id == id, cancellation);
                }

                // DTOs
                public async Task<IReadOnlyList<PostTableDto>> GetTableAsync(CancellationToken cancellation)
                {
                        return await _db.Posts.AsNoTracking()
                                .ProjectTo<PostTableDto>(_mapperConfig)
                                .ToListAsync(cancellation);
                }

                public async Task<AdminPostDetailDto?> GetDetailByIdAsync(Guid id, CancellationToken cancellation)
                {
                        return await _db.Posts.AsNoTracking()
                                .Where(x => x.Id == id)
                                .Include(x => x.Tags)
                                .ProjectTo<AdminPostDetailDto>(_mapperConfig)
                                .FirstOrDefaultAsync(cancellation);
                }

                #endregion

                #region Create
                public Task Add(Post post)
                {
                        _db.Posts.Add(post);
                        return Task.CompletedTask;
                }
                #endregion

                #region Update
                public Task Update(Post post)
                {
                        _db.Posts.Update(post);
                        return Task.CompletedTask;
                }
                #endregion
        }
}
