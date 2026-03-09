"use client";

import RichEditor from "@/components/editor/RichEditor";
import { useEffect, useState } from "react"
import { TagLookupDto } from "@/domains/tag/tag.model";
import { ListLookupTags } from "@/domains/tag/tag.api";
import SingleDropdown from "@/components/dropdown/SingleDropdown";
import MultipleDropdown from "@/components/dropdown/MultipleDropdown";

export default function AdminContentCreatePostPage() {
      // Variables
      const [title, setTitle] = useState("");
      const [content, setContent] = useState<any>({
            type: "doc",
            content: [],
      });
      const [tags, setTags] = useState<TagLookupDto[]>([]);
      const [tagLoading, setTagLoading] = useState(true);
      const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
      const [selectedTagId, setSelectedTagId] = useState<string>();

      // UseEffect
      useEffect(() => {
            (async () => {
                  const data = await ListLookupTags();
                  setTags(data);
                  setTagLoading(false);
            })();
      }, []);

      return (
            <div className="flex gap-4">
                  {/* Infor */}
                  <div className="w-64 bg-[#fff] rounded-sm p-2 shadow-md">
                        <div className="text-center font-bold">Metadata</div>
                        <div>
                              <MultipleDropdown items={tags}
                                    getValue={(x) => x.id}
                                    getLabel={(x) => x.name}
                                    value={selectedTagIds}
                                    placeholder="Select tags"
                                    onChange={setSelectedTagIds}
                              ></MultipleDropdown>

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