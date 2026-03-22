'use client'

import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-blue.css';

type CodeBlockProps = {
  code: string;
  language?: string;
};

export default function CodeBlock({ code, language = 'csharp' }: CodeBlockProps) {
      const ref = useRef<HTMLElement>(null);

      useEffect(() => {
            if (ref.current) {
                  hljs.highlightElement(ref.current);
            }
      }, [code]);

      return (
            <pre className="code-block">
                  <code ref={ref} className={`language-${language}`}>
                        {code}
                  </code>
            </pre>
      );
}