using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using trkienBlog.Application.Auth.Contracts;
using trkienBlog.Application.Auth.Services;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Infrastructure.Auth.Services
{
        public sealed class JwtTokenService : ITokenService
        {
                private readonly IConfiguration _config;
                public JwtTokenService(IConfiguration config)
                {
                        _config = config;       
                }

                public TokenResult GenerateAccessToken(User user)
                {
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var claims = new[]
                        {
                                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username)
                        };

                        var expires = DateTime.UtcNow.AddHours(1);

                        var token = new JwtSecurityToken(
                                issuer: _config["Jwt:Issuer"],
                                audience: _config["Jwt:Audience"],
                                claims: claims,
                                expires: expires,
                                signingCredentials: creds
                        );

                        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                        return new TokenResult(tokenString, expires);
                }
        }
}
