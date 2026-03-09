import { FilePlusCorner } from "lucide-react";
import buttonCss from "../../../styles/button.module.css";
import Link from "next/link";
import { adminRoutes } from "@/lib/routes/admin-route";

export default function AdminContentPostsPage() {
      return (
            <div>
                  <Link href={adminRoutes.adminPostsCreate} 
                  className={`${buttonCss.skyBlueButton} flex gap-2 items-center !w-fit`}>
                        <FilePlusCorner size={15}/> 
                        <span>Write a post</span>
                  </Link>
            </div>
      )
}