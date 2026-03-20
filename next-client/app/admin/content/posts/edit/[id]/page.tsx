"use client"

import { AdminPostDetailDto } from "@/domains/posts/admin-post.dto";
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AdminGetPostDetail, AdminUpdatePost } from "@/domains/posts/admin-post.api";
import KitInput from "@/components/input/KitInput";
import { useForm } from "react-hook-form";
import { PostFormData } from "@/domains/posts/post.model";
import SingleDropdown from "@/components/dropdown/SingleDropdown";
import { TopicLookupDto } from "@/domains/topic/topic.model";
import { ListLookupTags } from "@/domains/tag/tag.api";
import { GetTopicLookup } from "@/domains/topic/topic.api";
import { TagLookupDto } from "@/domains/tag/tag.model";
import MultipleDropdown from "@/components/dropdown/MultipleDropdown";
import buttonStyles from "../../../../../styles/button.module.css";
import RichEditor from "@/components/editor/RichEditor";

export default function AdminContentEditPostPage() {
      const params = useParams();
      const id = params.id as string;

      const {
            register, handleSubmit, control, setValue, reset,
            formState: { errors, isSubmitting }
      } = useForm<PostFormData>({});

      const [autoSlug, setAutoSlug] = useState(true);

      // content
      const [content, setContent] = useState<any>({
            type: "doc",
            content: [],
      });

      // topics
      const [topicsLookups, setTopicLookups] = useState<TopicLookupDto[]>([]);
      const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>();
      useEffect(() => {
            (async () => {
                  const lookup = await GetTopicLookup();
                  setTopicLookups(lookup);
            })();
      }, []);

      // tags
      const [tags, setTags] = useState<TagLookupDto[]>([]);
      const [tagLoading, setTagLoading] = useState(true);
      const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
      useEffect(() => {
            (async () => {
                  const tags = await ListLookupTags();
                  setTags(tags);
                  setTagLoading(false);
            })();
      }, []);

      // thumbnail
      const fileInputRef = useRef<HTMLInputElement>(null);
      const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
      const [thumbnailPreview, setThumbnailPreview] = useState("/thumbnails/default-thumbnail.jpg");
      const openFileDialog = () => { fileInputRef.current?.click(); };
      const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setThumbnailFile(file);

            const preview = URL.createObjectURL(file);
            setThumbnailPreview(preview);
      };

      // post detail
      const [postDetail, setPostDetail] = useState<AdminPostDetailDto>();
      useEffect(() => {
            (async () => {
                  const detail = await AdminGetPostDetail(id);
                  if (detail === null) {
                        alert("Post not found");
                        return;
                  }

                  setPostDetail(detail);
                  console.log("detail: ", detail);

                  setSelectedTopicId(detail.topicId);
                  setSelectedTagIds(detail.tagIds);
                  setContent(JSON.parse(detail.contentJson));
                  if (detail.thumbnailUrl) {
                        setThumbnailPreview(detail.thumbnailUrl);
                  }
                  reset({
                        title: detail.title,
                        slug: detail.slug
                  });
            })();
      }, [id, reset]);

      const onSubmit = async (data: PostFormData) => {
            try {
                  const formData = new FormData();
                  formData.append("title", data.title);
                  formData.append("slug", data.slug);
                  formData.append("contentJson", JSON.stringify(content));
                  formData.append("topicId", selectedTopicId!);

                  selectedTagIds.forEach((id, idx) => {
                        formData.append(`tagIds[${idx}]`, id);
                  });

                  if (thumbnailFile) {
                        formData.append("thumbnail", thumbnailFile);
                  }

                  await AdminUpdatePost(id, formData);

                  alert("success");

            } catch (error) {
                  alert(error instanceof Error ? error.message : 'Failed to save changes');
            }
      }

      return (
            <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
                  {/* Metadata */} 
                  <div className="w-fit bg-[#fff] rounded-sm p-2 shadow-md">
                        <div className="text-center font-bold">Metadata</div>
                        <div className="flex flex-col gap-4">
                              {/* Slug */}
                              <div>
                                    <KitInput label="Slug" type="text" placeholder="slug" className="flex-1"
                                          {...register("slug")} onChange={() => setAutoSlug(false)}
                                    ></KitInput>
                                    {errors.slug && (
                                          <p className="text-red-500 text-xs mt-1">
                                                {errors.slug.message}
                                          </p>
                                    )}
                              </div>

                              {/* Select Topic */}
                              <SingleDropdown items={topicsLookups}
                                    dropdownLabel="Select a topic"
                                    getValue={(x) => x.id}
                                    getLabel={(x) => x.name}
                                    getImageUrl={(x) => x.imageUrl}
                                    value={selectedTopicId}
                                    placeholder="Select a topic"
                                    onChange={setSelectedTopicId}
                              ></SingleDropdown>

                              {/* Select tags */}
                              <MultipleDropdown items={tags}
                                    dropdownLabel="Select tag"
                                    getValue={(x) => x.id}
                                    getLabel={(x) => x.name}
                                    value={selectedTagIds}
                                    placeholder="Select tags"
                                    onChange={setSelectedTagIds}
                              ></MultipleDropdown>

                              {/* Thumbnail */}
                              <div className="flex flex-col">
                                    <label className="label">Thumbnail</label>
                                    <div className="relative w-[300px] h-[180px] rounded-lg overflow-hidden cursor-pointer group" onClick={openFileDialog}>
                                          <Image src={thumbnailPreview} alt="thumbnail" fill className="object-cover" />
                                          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
                                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm">
                                                Upload thumbnail
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Editor */}
                  <div className="w-7xl mx-auto">
                        <div className="flex gap-4 items-center">
                              {/* Title */}
                              <div className="w-full">
                                    <input type="text" placeholder="Untitled post"
                                          className="text-4xl font-bold w-full outline-none"
                                          {...register("title", { required: "Title is required" })}
                                    />
                                    {errors.title && (
                                          <p className="text-red-500 text-xs mt-1">
                                                {errors.title.message}
                                          </p>
                                    )}
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                    <button className={buttonStyles.cancelButton}>Cancel</button>
                                    <button type="submit" className={buttonStyles.saveButton} disabled={isSubmitting}>
                                          {isSubmitting ? 'Saving ...' : 'Save'}
                                    </button>
                              </div>
                        </div>

                        {/* Editor */}
                        <div className="mt-4">
                              <RichEditor value={content} onChange={setContent} />
                        </div>
                  </div>
            </form>
      )
}