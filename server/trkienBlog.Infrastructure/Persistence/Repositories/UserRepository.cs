using Microsoft.EntityFrameworkCore;
using trkienBlog.Application.Users.Repositories;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Infrastructure.Persistence.Repositories
{
        public sealed class UserRepository : IUserRepository
        {
                private readonly AppDbContext _db;
                public UserRepository(AppDbContext db)
                {
                        _db = db;
                }

                public async Task AddAsync(User user, CancellationToken cancellation)
                {
                        _db.Users.Add(user);
                        await _db.SaveChangesAsync(cancellation);   
                }

                public async Task<bool> ExistUserByUsernameAysnc(string username, CancellationToken cancellation)
                {
                        return await _db.Users.AsNoTracking()
                                .AnyAsync(x => x.Username == username, cancellation);
                }

                public async Task<User?> GetByUsernameAsync(string username, CancellationToken cancellation)
                {
                        return await _db.Users
                                .FirstOrDefaultAsync(x => x.Username == username.Trim(), cancellation);
                }
        }
}
