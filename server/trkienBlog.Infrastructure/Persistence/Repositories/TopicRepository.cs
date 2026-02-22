using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Application.Contents.Topics.Repositories;
using trkienBlog.Domain.Entities;
using trkienBlog.Domain.Exceptions;

namespace trkienBlog.Infrastructure.Persistence.Repositories
{
        public sealed class TopicRepository : ITopicRepository
        {
                private readonly AppDbContext _db;
                private readonly IConfigurationProvider _mapperConfig;
                public TopicRepository(AppDbContext db, IConfigurationProvider mapperConfig)
                {
                        _db = db;
                        _mapperConfig = mapperConfig;
                }

                #region Read
                public async Task<bool> ExistByNameAsync(string name, CancellationToken cancellation)
                {
                        if (string.IsNullOrEmpty(name))
                                throw new DomainException("name is required");

                        return await _db.Topics.AsNoTracking()
                                .AnyAsync(x => x.Name == name.Trim(), cancellation);
                }

                public async Task<TopicDto?> GetByIdAsync(Guid id, CancellationToken cancellation)
                {
                        return await _db.Topics
                                .Where(x => x.Id == id)
                                .ProjectTo<TopicDto>(_mapperConfig)
                                .FirstOrDefaultAsync(cancellation);
                } 

                public async Task<List<Topic>> ListAllAsync(CancellationToken cancellation)
                {
                        return await _db.Topics.AsNoTracking()
                                .OrderBy(x => x.Name)
                                .ToListAsync(cancellation);
                }
                #endregion

                #region Write
                public async Task AddAsync(Topic topic, CancellationToken cancellation)
                {
                        _db.Topics.Add(topic);  
                        await _db.SaveChangesAsync(cancellation);       
                }
                #endregion
        }
}
