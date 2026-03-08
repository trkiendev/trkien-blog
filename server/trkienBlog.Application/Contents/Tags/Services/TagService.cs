using trkienBlog.Application.Contents.Tags.Contracts;
using trkienBlog.Application.Contents.Tags.Repositories;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Application.Contents.Tags.Services
{
        public sealed class TagService : ITagService
        {
                private readonly ITagRepository _tagRepo;
                public TagService(ITagRepository tagRepo)
                {
                        _tagRepo = tagRepo;     
                }

                // GetTable
                public async Task<IReadOnlyList<TagTableDto>> GetTable(CancellationToken cancellation)
                {
                        return await _tagRepo.GetTableAsync(cancellation);
                }

                // Create
                public async Task<TagDto> CreateAsync(string name, string slug, CancellationToken cancellation)
                {
                        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(slug))
                                throw new InvalidDataException("Name is invalid");

                        var tag = new Tag(name.Trim(), slug.Trim());
                        await _tagRepo.AddAsync(tag, cancellation);

                        return new TagDto
                        {
                                Id = tag.Id,
                                Name = tag.Name,
                                Slug = tag.Slug,
                                IsActive = tag.IsActive,
                                IsVisible = tag.IsVisible,      
                                DisplayOrder = tag.DisplayOrder,        
                                CreatedAt = tag.CreatedAt
                        };
                }
        }
}
