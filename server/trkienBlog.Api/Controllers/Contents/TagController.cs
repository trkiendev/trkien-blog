using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trkienBlog.Application.Contents.Tags.Contracts;
using trkienBlog.Application.Contents.Tags.Services;

namespace trkienBlog.Api.Controllers.Contents
{
        [ApiController]
        [Route("api/tags")]
        public class TagController : ControllerBase
        {
                private readonly ITagService _tagService;
                public TagController(ITagService tagService)
                {
                        _tagService = tagService;       
                }

                #region GET
                [Authorize]
                [HttpGet]
                public async Task<IActionResult> GetTables(CancellationToken cancellation)
                {
                        var table = await _tagService.GetTable(cancellation);   
                        return Ok(table);
                }

                [Authorize]
                [HttpGet("lookup")]       
                public async Task<IActionResult> ListLookup(CancellationToken cancellation)
                {
                        var lookups = await _tagService.ListLookupAsync(cancellation);  
                        return Ok(lookups);
                }
                #endregion

                #region POST
                [Authorize]
                [HttpPost]
                public async Task<IActionResult> CreateAsync(TagPayload payload, CancellationToken cancellation)
                {
                        if (payload is null)
                                throw new InvalidDataException("TagPayload is invalid");

                        var dto = await _tagService.CreateAsync(payload.Name, payload.Slug, cancellation);

                        return Created("Success", dto);
                }
                #endregion
        }
}
