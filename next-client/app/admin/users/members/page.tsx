'use client';

import { useState } from "react";
import AddMemberModal from "./components/add-member-modal";
import cardCss from "../../../styles/card.module.css";
import buttonCss from "../../../styles/button.module.css"

export default function AdminUsersMembersPage() {
      const [open, setOpen] = useState(false);
      
      return (
            <>
                  <div className={cardCss.primaryCard}>
                        <div className={cardCss.cardWrapper}>
                              <div className={`${cardCss.cardHeader} flex justify-between`}>
                                    <span className="content-center font-bold">Members</span>

                                    <button onClick={() => setOpen(true)} className={buttonCss.defaultButton}>
                                          New member
                                    </button>
                              </div>
                              <div className="cardBody">

                              </div>
                        </div>
                  </div>

                  <AddMemberModal open={open} onClose={() => setOpen(false)}/>
            </>
      )
}