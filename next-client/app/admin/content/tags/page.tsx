'use client'

import { useState } from "react";
import cardCss from "../../../styles/card.module.css"
import KitInput from "@/components/input/KitInput";

export default function AdminContentTagsPage() {
      const [name, setName] = useState("");
      
      return (
            <div>
                  {/* Table tags */}
                  <div className="w-1/3">
                  
                  </div>

                  {/* Create tags form */}
                  <form className={`${cardCss.primaryCard} w-1/3`}>
                        <div className={cardCss.cardWrapper}>
                              <div className={`${cardCss.cardHeader} flex justify-center`}>
                                    <span className="content-center font-bold">New tags</span>
                              </div>
                              <div className={`${cardCss.cardBody} flex flex-col gap-4`}>
                                    {/* tag name */}
                                    <KitInput label="Name" type="text" placeholder="Tag name" className="flex-1"
                                    value={name} onChange={(e) => setName(e.target.value)}></KitInput>
                              </div>
                        </div>
                  </form>
            </div>
      )
}