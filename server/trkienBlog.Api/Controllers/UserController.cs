using Microsoft.AspNetCore.Mvc;
using trkienBlog.Application.Users.Contracts;
using trkienBlog.Application.Users.Services.Interfaces;

namespace trkienBlog.Api.Controllers
{
        [ApiController]
        [Route("api/users")]
        public class UserController : ControllerBase
        {
                private readonly IUserService _userService;
                public UserController(IUserService userService)
                {
                        _userService = userService;
                }

                [HttpPost]
                public async Task<IActionResult> Create([FromBody] UserPayload payload, CancellationToken cancellation)
                {
                        await _userService.CreateAsync(payload, cancellation);
                        return Ok();
                }
        }
}
