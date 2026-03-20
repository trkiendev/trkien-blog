using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace trkienBlog.Api.Controllers.Contents
{
        [Authorize]
        [ApiController]
        [Route("api/posts")]
        public class PostController : ControllerBase
        {
                private readonly IMediator _mediator;
                public PostController(IMediator mediator)
                {
                        _mediator = mediator;
                }


        }
}
