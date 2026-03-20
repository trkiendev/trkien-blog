using trkienBlog.Application.Abstractions;

namespace trkienBlog.Infrastructure.Persistence
{
        public sealed class UnitOfWork : IUnitOfWork
        {
                private readonly AppDbContext _db;
                public UnitOfWork(AppDbContext db)
                {
                        _db = db;       
                }

                public async Task<int> SaveChangesAsync(CancellationToken cancellation = default)
                {
                        return await _db.SaveChangesAsync(cancellation);
                }
        }
}
