"use client";

import { BookOpenText, ChevronDown, Dot, LayoutDashboard, UserRoundCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AdminSidebar() {
      const [openKey, setOpenKey] = useState<string | null>(null);

      return (
            <>
                  <div className="px-3 pl-6 border-r border-zinc-200">
                        {/* Logo */}
                        <Link href="/" className="px-3 py-4 flex items-center gap-1" >
                              <Image src="/logo.png" alt="logo" width={40} height={40} />
                              <span className="font-bold text-blue-600 text-2xl">trkien.dev</span>
                        </Link>

                        {/* Menu */}
                        <nav className="space-y-1">
                              { sidebars.map((item) => {
                                    const Icon = item.icon;
                                    const isOpen = openKey === item.href;

                                    return (
                                          <div key={item.href} className="font-size-13px">
                                                {/* Parent */}
                                                <button onClick={() => setOpenKey(isOpen ? null : item.href)}
                                                className={`w-full p-2.5 flex items-center gap-2 rounded-md cursor-pointer transition-colors
                                                ${isOpen ? "bg-[#0096FF] text-white" : "text-[#7d7d7d] hover:bg-[#f5f5f5] hover:text-black"}`}>
                                                      <Icon className="w-4 h-4" />
                                                      {item.label}
                                                      {/* Chevron – chỉ hiện khi có children */}
                                                      {item.children && (
                                                            <ChevronDown  className={`ml-auto w-4 h-4 transition-transform duration-200
                                                            ${isOpen ? "rotate-180" : "rotate-0"}`} />
                                                      )}
                                                </button>

                                                {/* Children */}
                                                {item.children && (
                                                      <div className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ease-out
                                                      ${isOpen ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"}"`}>
                                                            {item.children.map((child) => (
                                                                  <Link className="flex items-center gap-1 block p-2 rounded-md text-[#9a9a9a] hover:bg-[#f5f5f5] hover:text-black transition-colors"
                                                                  key={child.href} href={child.href}>
                                                                        <Dot className="w-4 h-4" />
                                                                        {child.label}
                                                                  </Link>
                                                            ))}
                                                      </div>
                                                )}
                                          </div>
                                    )
                              })}
                        </nav>
                  </div>
            </>
      );
}

const sidebars = [
      {
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
      },
      {
            label: "Content",
            href: "/admin/content",
            icon: BookOpenText,
            children: [
                  {
                        label: 'Topics',
                        href: "/admin/content/topics",
                  }
            ]
      },
      {
            label: "Users",
            href: "/admin",
            icon: UserRoundCog,
            children: [
                  {
                        label: "Profile",
                        href: "/admin/users/profile",
                  },
                  {
                        label: "Members",
                        href: "/admin/users/members",
                  },
            ],
      },
];

