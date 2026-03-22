'use client'

import { AdminGetPostDetail } from "@/domains/posts/admin-post.api";
import { AdminPostDetailDto } from "@/domains/posts/admin-post.dto";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PostRenderer from "@/components/posts/post-renderer/PostRenderer";
import cardStyles from "../../../../../styles/card.module.css";
import { formatDate } from "@/shared/utils/datetime";
import badgeStyles from "../../../../../styles/badge.module.css";
import TooltipButton from "@/components/buttons/icon-button/TooltipButton";
import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminContentPostPreviewPage() {
      const params = useParams();
      const id = params.id as string;
      const router = useRouter();

      const [ postDetail, setPostDetail ] = useState<AdminPostDetailDto>();

      const editor = useEditor({
            editable: false,
            extensions: [StarterKit],
            immediatelyRender: false,
            content: postDetail?.contentJson
      })

      useEffect(() => {
            (async() => {
                  const detail = await AdminGetPostDetail(id);
                  console.log("detail: ", detail);
                  if(detail === null) {
                        alert("Post not found");
                        return;
                  }

                  setPostDetail(detail);
            })();
      }, []);

      useEffect(() => {
            if (editor && postDetail?.contentJson) {
                  editor.commands.setContent(postDetail.contentJson);
            }
      }, [editor, postDetail]);

      if (!postDetail) {
            return <div>Loading...</div>;
      }

      return (
            <div className="flex gap-2">
                  {/* Preview box */}
                  <div className={`${cardStyles.primaryCard} w-fit`}>
                        <div className={`${cardStyles.cardWrapper}`}>
                              <div className={`${cardStyles.cardHeader}`}>
                                    <span>Preview</span>
                              </div>
                              <div className={`${cardStyles.cardBody}`}>
                                    <div className="page-container">
                                          <div className="blog-post flex flex-col gap-6">
                                                {/* Heading */}
                                                <div className="flex gap-4">
                                                      {/* Left */}
                                                      <div className="flex flex-col gap-4">
                                                            <span className="title">{postDetail?.title}</span>
                                                            <div className="tag-list">
                                                                  <ul className="flex gap-2">
                                                                        {postDetail?.tagLookups && postDetail?.tagLookups.length > 0 ? (
                                                                              postDetail.tagLookups.map(tag => (
                                                                                    <li key={tag.id} className="tag-item">
                                                                                          <a href="">{tag.name}</a>
                                                                                    </li>  
                                                                              ))
                                                                        ) : null}
                                                                  </ul>
                                                            </div>
                                                      </div>
                                                      
                                                      {/* Right */}
                                                      <div className="relative w-[720px] h-[405px] rounded-lg overflow-hidden">
                                                            {postDetail?.thumbnailUrl && (
                                                                  <Image src={postDetail.thumbnailUrl} alt="thumbnail" fill/>
                                                            )}
                                                      </div>
                                                </div>

                                                {/* Body */}
                                                <div className="post-body">
                                                      <PostRenderer content={postDetail?.contentJson ?? ""}></PostRenderer>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Actions */}
                  <div className={`${cardStyles.primaryCard} flex-1`}>
                        <div className={`${cardStyles.cardWrapper} !h-full`}>
                              <div className={`${cardStyles.cardBody} flex flex-col gap-4`}>
                                    <div className="flex justify-center">
                                          <TooltipButton text="Edit" icon={SquarePen} bgColor="#54BAB9" fgColor="#fff"
                                          onClick={() => router.push(`/admin/content/posts/edit/${id}`)}/>
                                    </div>
                                    <div>
                                          <label htmlFor="">Created At: </label>
                                          <span>{formatDate(postDetail.createdAt)}</span>
                                    </div>
                                    <div>
                                          <label htmlFor="">Status</label>
                                          <span className={`${badgeStyles.badge} ${badgeStyles[postDetail.status.toLowerCase()]}`}>
                                                {postDetail?.status}
                                          </span>               
                                    </div>

                              </div>
                        </div>
                  </div>
            </div>
      );
}