"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import languageSwitcherStyle from "./LanguageSwitcher.module.css";

const LANGS = [
      { code: "vi", label: "🇻🇳 Vietnam" },
      { code: "en", label: "🇬🇧 English" },
];


export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
      const pathname = usePathname();
      const router = useRouter();

      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const nextLang = e.target.value;
            const nextPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);
            router.push(nextPath);
      }

      return (
            <select name="language" value={currentLang} onChange={handleChange}
            className={languageSwitcherStyle.languageSwitcherSelect}>
                  { LANGS.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.label}</option>
                  ))}
            </select> 
      )
}