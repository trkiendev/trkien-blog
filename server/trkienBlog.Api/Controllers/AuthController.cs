using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using trkienBlog.Application.Auth.Contracts;
using trkienBlog.Application.Auth.Services;

namespace trkienBlog.Api.Controllers
{
        [ApiController]
        [Route("api/auth")]
        public class AuthController : ControllerBase
        {
                private readonly IAuthService _authService;
                public AuthController(IAuthService authService)
                {
                        _authService = authService;
                }

                [HttpPost("login")]
                public async Task<IActionResult> Login([FromBody] LoginPayload payload, CancellationToken cancellation)
                {
                        var result = await _authService.LoginAsync(payload, cancellation);

                        // Set cookie
                        var cookieOptions = new CookieOptions
                        {
                                HttpOnly = true,
                                Secure = !HttpContext.RequestServices
                                        .GetRequiredService<IHostEnvironment>()
                                        .IsDevelopment(),
                                SameSite = SameSiteMode.Lax,
                                Expires = result.ExpireAt,
                                Path = "/"
                        };

                        Response.Cookies.Append("access_token", result.AccessToken, cookieOptions);

                        return Ok(new
                        {
                                success = true,
                                data = result,
                        });
                }

                [HttpPost("logout")]
                public IActionResult Logout()
                {
                        // Delete cookies
                        Response.Cookies.Delete("access_token", new CookieOptions
                        {
                                Path = "/"
                        });

                        return Ok(new { success = false });
                }

                [Authorize]
                [HttpGet("me")]
                public IActionResult Me()
                {
                        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
                        var username = User.FindFirstValue(JwtRegisteredClaimNames.UniqueName);

                        return Ok(new
                        {
                                success = true,
                                data = new
                                {
                                        id = userId,
                                        username = username
                                }
                        });
                }
        }
}
