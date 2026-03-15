'use client'

import { AdminGetPostDetail } from "@/domains/posts/admin-post.api";
import { AdminPostDetailDto } from "@/domains/posts/admin-post.dto";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AdminContentPostPreviewPage() {
      const params = useParams();
      const id = params.id as string;
      
      const [ postDetail, setPostDetail ] = useState<AdminPostDetailDto>();

      useEffect(() => {
            (async() => {
                  const detail = await AdminGetPostDetail(id);
                  if(detail === null) {
                        alert("Post not found");
                        return;
                  }

                  console.log("detail: ", detail);

                  setPostDetail(detail);
            })();
      }, []);

      return (
            <div>
                  Preview mode for post: {id}
            </div>
      );
}