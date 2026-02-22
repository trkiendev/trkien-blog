import layoutCss from "../../layout.module.css";
import React from "react";
import Header from "./_components/Header/Header";
import { LangRouteProps, resolveLocale } from "@/lib/i18n";

type Props = LangRouteProps & {
      children: React.ReactNode;
};

export default async function PublicLayout({ children, params }: Props) {
      const lang = await resolveLocale(params);

      return (
            <section className="page-section">
                  <div className="page-container">

                        {/* header */}
                        <Header lang={lang} />

                        {/* main */}
                        <main className="h-full">{children}</main>

                        {/* footer */}
                        <footer className={layoutCss.footer} >
                              <span className={layoutCss.footerCopyright}>© 2026 — trKien.Blog. All Rights Reserved.</span>
                        </footer>

                  </div>
            </section>
      );
}
