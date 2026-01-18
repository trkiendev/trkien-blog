import { highlightCode } from '@/lib/shiki';

type CodeBlockProps = {
  code: string;
  language?: string;
};

export default async function CodeBlock({
  code,
  language = 'csharp'
}: CodeBlockProps) {
      const html = await highlightCode(code, language);

      return (
      <div className="code-block"
            dangerouslySetInnerHTML={{ __html: html }}
      />
      );
}