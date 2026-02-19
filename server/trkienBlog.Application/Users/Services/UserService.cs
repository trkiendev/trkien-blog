using trkienBlog.Application.Security;
using trkienBlog.Application.Users.Contracts;
using trkienBlog.Application.Users.Repositories;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Application.Users.Services
{
        public class UserService
        {
                private readonly IUserRepository _userRepo;
                private readonly IPasswordHaser _hasher;
                public UserService(IUserRepository userRepo, IPasswordHaser hasher)
                {
                        _userRepo = userRepo;
                        _hasher = hasher;
                }

                public async Task CreateAsync(UserPayload payload, CancellationToken cancellation)
                {
                        var username = payload.UserName.Trim();
                        var password = payload.Password.Trim();

                        #region Validation
                        if (string.IsNullOrWhiteSpace(username))
                                throw new ArgumentException("Username is required");

                        if (string.IsNullOrWhiteSpace(password))
                                throw new ArgumentException("Password is required");

                        if(username.Length < 3)
                        {
                                throw new ArgumentException("Username must be at least 3 characters");
                        }

                        if(password.Length < 3)
                        {
                                throw new ArgumentException("Password must be at least 6 characters");
                        }

                        var exist = await _userRepo.ExistUserByUsernameAysnc(username, cancellation);
                        if(exist is false)
                        {
                                throw new InvalidOperationException("User already exist");
                        }
                        
                        #endregion                        

                        var user = new User(username, _hasher.Hash(password));
                        await _userRepo.AddAsync(user, cancellation);
                }
        }
}
