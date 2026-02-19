using trkienBlog.Application.Auth.Contracts;
using trkienBlog.Application.Security;
using trkienBlog.Application.Users.Repositories;

namespace trkienBlog.Application.Auth.Services
{
        public sealed class AuthService : IAuthService
        {
                private readonly IUserRepository _userRepo;
                private readonly IPasswordHaser _passHasher;
                private readonly ITokenService _tokenService;
                public AuthService(IUserRepository userRepo, IPasswordHaser passHasher, ITokenService tokenService)
                {
                        _userRepo = userRepo;
                        _passHasher = passHasher;
                        _tokenService = tokenService;
                }

                public async Task<AuthResult> LoginAsync(LoginPayload payload, CancellationToken cancellation)
                {
                        #region Validation
                        if (string.IsNullOrWhiteSpace(payload.Username))
                                throw new ArgumentException("Username is required");

                        if (string.IsNullOrEmpty(payload.Password))
                                throw new ArgumentException("Password is required");
                        #endregion

                        var username = payload.Username.Trim();
                        var password = payload.Password.Trim();


                        var user = await _userRepo.GetByUsernameAsync(username, cancellation);
                        if (user is null)
                                throw new UnauthorizedAccessException("Invalid credentials");

                        var isValid = _passHasher.Verify(password, user.PasswordHash);
                        if (!isValid)
                                throw new UnauthorizedAccessException("Invalid credentials");

                        var token = _tokenService.GenerateAccessToken(user);

                        return new AuthResult(token.AccessToken, token.ExpireAt);
                }
        }
}
