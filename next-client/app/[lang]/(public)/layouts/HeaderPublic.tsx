import Link from "next/link";
import Image from "next/image";
import layoutStyles from "../../../layout.module.css";
import LanguageSwitcher from "./LanguageSwitcher";

export default function HeaderPublic({ lang }: { lang: string }) {
      return (
            <header className="flex items-center justify-between">
                  <h1 className="header-logo select-none">
                        <Link href={`/${lang}`} className="flex items-center gap-1">
                              <Image src="/logo.png" alt="logo" width={50} height={50} priority />
                              <span className={layoutStyles.logoTitle}>trkien.dev</span>
                        </Link>
                  </h1>

                  <LanguageSwitcher currentLang={lang} />

                  {/* <select name="language">
                        <option value="vi">🇻🇳 Vietnam</option>
                        <option value="en">🇬🇧 English</option>
                  </select> */}
            </header> 
      )
}