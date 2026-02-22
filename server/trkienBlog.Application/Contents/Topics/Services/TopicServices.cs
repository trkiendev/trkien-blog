using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Application.Contents.Topics.Repositories;
using trkienBlog.Application.Contents.Topics.Services.Interfaces;
using trkienBlog.Application.Exceptions;
using trkienBlog.Application.FileStorage.Services;
using trkienBlog.Application.FileStorages.Contracts;
using trkienBlog.Application.FileStorages.Services;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Application.Contents.Topics.Services
{
        public class TopicServices : ITopicService
        {
                private readonly IFileStorageService _storage;
                private readonly ITopicRepository _topicRepo;
                private readonly IFileUrlBuilder _urlBuilder;
                public TopicServices(IFileStorageService storage, ITopicRepository topicRepo, IFileUrlBuilder urlBuilder)
                {
                        _storage = storage;
                        _topicRepo = topicRepo;
                        _urlBuilder = urlBuilder;
                }

                // GetById
                public async Task<TopicDto?> GetByIdAsync(Guid id, CancellationToken cancellation)
                {
                        var dto = await _topicRepo.GetByIdAsync(id, cancellation)
                                ?? throw new NotFoundException("topic not found");

                        return dto;
                }

                // ListAll
                public async Task<IReadOnlyList<TopicDto>> ListAllAsync(CancellationToken cancellation)
                {
                        var topics = await _topicRepo.ListAllAsync(cancellation);

                        return topics.Select(x => new TopicDto
                        {
                                Id = x.Id,
                                Name = x.Name,
                                imageUrl = _urlBuilder.Build(x.ImageKey)
                        }).ToList();
                }

                // Create
                public async Task<TopicDto> CreateAsync(string name, FileUploadDto? image, CancellationToken cancellation)
                {
                        string? imageKey = null;

                        if(image is not null)
                        {
                                using (image.Stream)
                                {
                                        imageKey = await _storage.UploadAsync(image.Stream, image.FileName, image.ContentType);
                                }
                        }

                        var topic = new Topic(name, imageKey);
                        await _topicRepo.AddAsync(topic, cancellation);

                        return new TopicDto
                        {
                                Id = topic.Id,
                                Name = topic.Name,
                                imageUrl = _urlBuilder.Build(imageKey)
                        };
                }
        }
}
