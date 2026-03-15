using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trkienBlog.Application.Contents.Posts.Commands;
using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Application.Contents.Posts.Queries;

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
