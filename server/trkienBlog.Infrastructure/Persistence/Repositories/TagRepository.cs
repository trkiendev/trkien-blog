using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using trkienBlog.Application.Contents.Tags.Contracts;
using trkienBlog.Application.Contents.Tags.Repositories;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Infrastructure.Persistence.Repositories
{
        public sealed class TagRepository : ITagRepository
        {
                private readonly AppDbContext _db;
                private readonly IConfigurationProvider _mapperConfig;
                public TagRepository(AppDbContext db, IConfigurationProvider mapperConfig)
                {
                        _db = db;
                        _mapperConfig = mapperConfig;
                }

                public async Task<IReadOnlyList<TagTableDto>> GetTableAsync(CancellationToken cancellation)
                {
                        return await _db.Tags.AsNoTracking()
                                .ProjectTo<TagTableDto>(_mapperConfig)
                                .ToListAsync(cancellation);
                }

                public async Task AddAsync(Tag tag, CancellationToken cancellation)
                {
                        _db.Tags.Add(tag);      
                        await _db.SaveChangesAsync(cancellation);
                }
        }
}
