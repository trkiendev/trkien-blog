import { renderNode, TipTapNode } from "./renderNode";

type PostRendererProps = {
      content: string
}

export default function PostRenderer({ content }: PostRendererProps) {
      if(!content) return null;

      let doc: TipTapNode;

      try {
            doc = JSON.parse(content);
      } catch {
            return <p>Invalid content</p>
      }

      return (
            <div className="post-content">
                  {doc.content?.map((node, i) => renderNode(node, i))}
            </div>
      )
}