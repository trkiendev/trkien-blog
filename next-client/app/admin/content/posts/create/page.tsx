"use client";

import RichEditor from "@/components/editor/RichEditor";
import { useState } from "react"

export default function AdminContentCreatePostPage() {
      const [title, setTitle] = useState("");
      const [content, setContent] = useState<any>({
            type: "doc",
            content: [],
      });

      return (
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
      )
}