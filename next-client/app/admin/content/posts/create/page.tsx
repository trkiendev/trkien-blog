"use client";

import RichEditor from "@/components/editor/RichEditor";
import { useEffect, useRef, useState } from "react"
import { TagLookupDto } from "@/domains/tag/tag.model";
import { ListLookupTags } from "@/domains/tag/tag.api";
import MultipleDropdown from "@/components/dropdown/MultipleDropdown";
import { TopicLookupDto } from "@/domains/topic/topic.model";
import { GetTopicLookup } from "@/domains/topic/topic.api";
import SingleDropdown from "@/components/dropdown/SingleDropdown";
import Image from "next/image";
import buttonStyles from "../../../../styles/button.module.css";
import { CreatePost } from "@/domains/posts/post.api";
import { PostForm, PostPayload } from "@/domains/posts/post.model";
import KitInput from "@/components/input/KitInput";
import { useForm, useWatch } from "react-hook-form";
import { slugify } from "@/shared/utils/slugify";

export default function AdminContentCreatePostPage() {
      const {
            register, handleSubmit, control, setValue, reset, 
            formState: { errors, isSubmitting }
      } = useForm<PostForm>({});

      // Variables
      const titleValue = useWatch({ control, name: "title"});

      const [autoSlug, setAutoSlug] = useState(true);
      useEffect(() => {
            if(!titleValue) return;
            if(!autoSlug) return;

            setValue("slug", slugify(titleValue));
      }, [titleValue]);
      
      const [content, setContent] = useState<any>({
            type: "doc",
            content: [],
      });

      // topics
      const [topicsLookups, setTopicLookups] = useState<TopicLookupDto[]>([]);
      const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>();

      // tags
      const [tags, setTags] = useState<TagLookupDto[]>([]);
      const [tagLoading, setTagLoading] = useState(true);
      const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

      // thumbnail
      const fileInputRef = useRef<HTMLInputElement>(null);
      const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
      const [thumbnailPreview, setThumbnailPreview] = useState("/thumbnails/default-thumbnail.jpg");

      // file dialog
      const openFileDialog = () => { fileInputRef.current?.click(); };
      const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setThumbnailFile(file);

            const preview = URL.createObjectURL(file);
            setThumbnailPreview(preview);
      };

      // Save
      const onSubmit = async (data: PostForm) => {
            try {
                  const formData = new FormData();
                  console.log("data: ", data);

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

                  await CreatePost(formData);
                  alert("success");
            } catch (error) {
                  alert(error instanceof Error ? error.message : 'Create post failed');
            }
      };

      // UseEffect
      useEffect(() => {
            (async () => {
                  const data = await ListLookupTags();
                  setTags(data);
                  setTagLoading(false);
            })();
      }, []);

      useEffect(() => {
            (async () => {
                  const lookup = await GetTopicLookup();
                  setTopicLookups(lookup);
            })();
      }, []);

      return (
            <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
                  {/* Infor */}
                  <div className="w-fit bg-[#fff] rounded-sm p-2 shadow-md">
                        <div className="text-center font-bold">Metadata</div>
                        <div className="flex flex-col gap-4">
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

                              {/* Select topic */}
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

                              {/* thumbnail */}
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
                                          {...register("title", { required: "Title is required"})} 
                                    />
                                    {errors.title && (
                                          <p className="text-red-500 text-xs mt-1">
                                          {errors.title.message}
                                          </p>
                                    )}
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                    <button className={buttonStyles.cancelButton}>Hủy</button>
                                    <button type="submit" className={buttonStyles.saveButton} disabled={isSubmitting}>
                                                {isSubmitting ? 'Submitting ...' : 'Submit'}
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