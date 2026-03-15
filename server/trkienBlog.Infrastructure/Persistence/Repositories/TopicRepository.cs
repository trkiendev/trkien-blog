using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using trkienBlog.Application.Contents.Topics;
using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Domain.Entities.Content;
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
                // Validation
                public async Task<bool> ExistByNameAsync(string name, CancellationToken cancellation)
                {
                        if (string.IsNullOrEmpty(name))
                                throw new DomainException("name is required");

                        return await _db.Topics.AsNoTracking()
                                .AnyAsync(x => x.Name == name.Trim(), cancellation);
                }

                public async Task<bool> ExistByIdAsync(Guid id, CancellationToken cancellation)
                {
                        return await _db.Topics.AsNoTracking()
                                .AnyAsync(x => x.Id == id, cancellation);
                }

                // Entity
                public async Task<List<Topic>> ListAllAsync(CancellationToken cancellation)
                {
                        return await _db.Topics.AsNoTracking()
                                .OrderBy(x => x.Name)
                                .ToListAsync(cancellation);
                }

                // Properties
                public async Task<Dictionary<Guid, string>> DictNameAsync(IEnumerable<Guid> ids, CancellationToken cancellation)
                {
                        ids = ids.Distinct();
                        return await _db.Topics.AsNoTracking()
                                .Where(x => ids.Contains(x.Id))
                                .ToDictionaryAsync(x => x.Id, x => x.Name, cancellation);
                }

                // DTOs
                public async Task<TopicDto?> GetByIdAsync(Guid id, CancellationToken cancellation)
                {
                        return await _db.Topics
                                .Where(x => x.Id == id)
                                .ProjectTo<TopicDto>(_mapperConfig)
                                .FirstOrDefaultAsync(cancellation);
                } 

                public async Task<List<TopicLookupDto>> ListLookupAsync(CancellationToken cancellation)
                {
                        return await _db.Topics.AsNoTracking()
                                .ProjectTo<TopicLookupDto>(_mapperConfig)
                                .ToListAsync(cancellation);
                }

                public async Task<IDictionary<Guid, TopicLookupDto>> DictLookupByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellation)
                {
                        ids = ids.Distinct().ToList();

                        return await _db.Topics.AsNoTracking()
                                .Where(x => ids.Contains(x.Id))
                                .ProjectTo<TopicLookupDto>(_mapperConfig)
                                .ToDictionaryAsync(x => x.Id, cancellation);
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
