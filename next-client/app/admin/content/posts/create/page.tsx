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

export default function AdminContentCreatePostPage() {
      // Variables
      const [title, setTitle] = useState("");
      const [content, setContent] = useState<any>({
            type: "doc",
            content: [],
      });

      // topics
      const [topicsLookups, setTopicLookups] = useState<TopicLookupDto[]>([]);
      const [selectedTopicId, setSelectedTopicId] = useState<string>();

      // tags
      const [tags, setTags] = useState<TagLookupDto[]>([]);
      const [tagLoading, setTagLoading] = useState(true);
      const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

      // thumbnail
      const fileInputRef = useRef<HTMLInputElement>(null);
      const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
      const [thumbnailPreview, setThumbnailPreview] = useState("/thumbnails/default-thumbnail.jpg");

      // file dialog
      const openFileDialog = () => {fileInputRef.current?.click();};
      const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setThumbnailFile(file);

            const preview = URL.createObjectURL(file);
            setThumbnailPreview(preview);
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
            <div className="flex gap-4">
                  {/* Infor */}
                  <div className="w-fit bg-[#fff] rounded-sm p-2 shadow-md">
                        <div className="text-center font-bold">Metadata</div>
                        <div className="flex flex-col gap-4">

                              {/* Select topic */}
                              <SingleDropdown items={topicsLookups}
                                    dropdownLabel = "Select a topic"
                                    getValue = {(x) => x.id}
                                    getLabel = {(x) => x.name}
                                    getImageUrl = {(x) => x.imageKey}
                                    value = {selectedTopicId}
                                    placeholder = "Select a topic"
                                    onChange = {setSelectedTopicId}
                              ></SingleDropdown>

                              {/* Select tags */}
                              <MultipleDropdown items={tags}
                                    dropdownLabel = "Select tag"
                                    getValue = {(x) => x.id}
                                    getLabel = {(x) => x.name}
                                    value = {selectedTagIds}
                                    placeholder = "Select tags"
                                    onChange = {setSelectedTagIds}
                              ></MultipleDropdown>

                              {/* thumbnail */}
                              <div className="flex flex-col gap-2">
                                    <label className="label">Thumbnail</label>
                                    <div className="relative w-[300px] h-[180px] rounded-lg overflow-hidden cursor-pointer group" onClick={openFileDialog}>
                                          <Image src={thumbnailPreview} alt="thumbnail" fill className="object-cover"/>
                                          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange}/>
                                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm">
                                                Upload thumbnail
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Editor */}
                  <div className="w-7xl mx-auto">
                        {/* Title */}
                        <input type="text" placeholder="Untitled post"
                              className="text-4xl font-bold w-full outline-none"
                              value={title} onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* Editor */}
                        <div className="mt-4">
                              <RichEditor value={content} onChange={setContent} />
                        </div>
                  </div>
            </div>
      )
}