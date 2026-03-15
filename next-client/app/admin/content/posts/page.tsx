'use client'

import { FilePlusCorner, ScanEye, SquarePen, Trash2 } from "lucide-react";
import buttonCss from "../../../styles/button.module.css";
import Link from "next/link";
import Image from "next/image";
import { adminRoutes } from "@/lib/routes/admin-route";
import cardStyles from "../../../styles/card.module.css";
import tableStyles from "../../../styles/table.module.css";
import { useEffect, useState } from "react";
import { PostTableDto } from "@/domains/posts/post.dto";
import { formatDate } from "@/shared/utils/datetime";
import badgeStyles from "../../../styles/badge.module.css";
import TooltipButton from "@/components/buttons/icon-button/TooltipButton";
import { useRouter } from "next/navigation";
import { AdminGetTablePosts } from "@/domains/posts/admin-post.api";

export default function AdminContentPostsPage() {
      const router = useRouter(); 

      const [posts,  setPosts] = useState<PostTableDto[]>([]);

      useEffect(() => {
            (async() => {
                  const table = await AdminGetTablePosts();
                  setPosts(table);
            })();
      }, [])

      return (
            <div className="flex flex-col gap-4">
                  {/* Headers */}
                  <div>
                        <Link href={adminRoutes.adminPostsCreate} 
                        className={`${buttonCss.skyBlueButton} flex gap-2 items-center !w-fit`}>
                              <FilePlusCorner size={15}/> 
                              <span>Write a post</span>
                        </Link>
                  </div>

                  {/* Body */}
                  <div>
                        <div className={`${cardStyles.primaryCard}`}>
                              <div className={cardStyles.cardWrapper}>
                                    <div className={cardStyles.cardHeader}>
                                          <h1>Posts</h1>
                                    </div>
                                    <div className={cardStyles.cardBody}>
                                          <table className={tableStyles.table}>
                                                <thead>
                                                      <tr>
                                                            <th>#</th>
                                                            <th>Thumbnail</th>
                                                            <th>Title</th>
                                                            <th>Status</th>
                                                            <th>Topic</th>
                                                            <th>Created At</th>
                                                            <th></th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      { posts.length === 0 ? (
                                                            <tr>
                                                                  <td colSpan={7} className={tableStyles.mutedRow}>
                                                                        No post yet
                                                                  </td>
                                                            </tr>
                                                      ) : (
                                                            posts.map((x, idx) => (
                                                                  <tr key={x.id}>
                                                                        <td>{idx + 1}</td>
                                                                        {/* Title */}
                                                                        <td>
                                                                              <div className="flex gap-2 justify-center items-center">
                                                                                    {x.thumbnailUrl ? (
                                                                                          <Image src={x.thumbnailUrl} alt={x.title} width={100} height={50}
                                                                                          className="rounded-md object-cover" />
                                                                                    ) : (
                                                                                          <div className="d-none"></div>
                                                                                    )}
                                                                              </div>
                                                                        </td>
                                                                        {/* Title */}
                                                                        <td>{x.title}</td>
                                                                        {/* Status */}
                                                                        <td>
                                                                              <span className={`${badgeStyles.badge} ${badgeStyles[x.status.toLowerCase()]}`}>
                                                                                    {x.status}
                                                                              </span>
                                                                        </td>
                                                                        {/* Topic */}
                                                                        <td>
                                                                              {x.topic?.imageUrl ? (
                                                                                    <div className="flex gap-4 justify-center items-center">
                                                                                          <Image src={x.topic.imageUrl} alt={x.topic.name} width={30} height={30} 
                                                                                          className="rounded-md object-cover"></Image>
                                                                                          <span>{x.topic.name}</span>
                                                                                    </div>
                                                                              ) : (
                                                                                    <div></div>
                                                                              )}
                                                                        </td>
                                                                        {/* CreatedAt */}
                                                                        <td>{formatDate(x.createdAt)}</td>
                                                                        {/* Actions */}
                                                                        <td>
                                                                              <div className="flex gap-2 justify-center">
                                                                                    <TooltipButton text="Preview" icon={ScanEye} bgColor="#1da1f2" fgColor="#fff"
                                                                                    onClick={() => window.open(`/admin/content/posts/preview/${x.id}`, "_blank", "noopener,noreferrer")}/>
                                                                                    <TooltipButton text="Edit" icon={SquarePen} bgColor="#54BAB9" fgColor="#fff"/>
                                                                                    <TooltipButton text="Delete" icon={Trash2} bgColor="#EE4B2B" fgColor="#fff"/>
                                                                                    
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            ))
                                                      )}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}