import layoutCss from "../../layout.module.css";
import React from "react";
import HeaderPublic from "./layouts/HeaderPublic";

type Props = {
      children: React.ReactNode;
      params: Promise<{ lang: string }>;
};

export default async function PublicLayout({ children, params }: Props ) {
      const { lang } = await params;
      return (
            <section className="page-section">
                  <div className="page-container">
                        <HeaderPublic lang={ lang} />
                        <main>{children}</main>
                        <footer className={layoutCss.footer} >
                              <span className={layoutCss.footerCopyright}>© 2026 — trKien.Blog. All Rights Reserved.</span>
                        </footer>
                  </div>
            </section>
      );
}
