import CodeBlock from "@/components/code/codeBlock"
import { slugify } from "@/shared/utils/slugify"

export type TipTapNode = {
      type: string
      text?: string
      attrs?: Record<string, any>
      content?: TipTapNode[]
}

export function renderNode(node: TipTapNode, key: number) {
      switch(node.type) {
            case "paragraph":
                  return (
                        <p key={key}>
                              {node.content?.map((child, i) => renderNode(child, i))}
                        </p>
                  )

            case "text":
                  return node.text;

            case "hardBreak":
                  return <br key={key} />;

            case "heading": {
                  const level = node.attrs?.level ?? 1;
                  const safeLevel = Math.min(Math.max(level, 1), 6);
                  const Tag = `h${safeLevel}` as React.ElementType;

                  const text = node.content?.map(x => x.text ?? "").join("") ?? "";
                  const id = slugify(text);

                  return (
                        <Tag key={key} id={id}>
                              {node.content?.map((child, i) => renderNode(child, i))}
                        </Tag>
                  );
            }

            case "bulletList": 
                  return (
                        <ul key={key} className="bullet-list">
                              {node.content?.map((child, i) => renderNode(child, i))}
                        </ul>
                  )

            case "listItem": 
                  return (
                        <li key={key}>
                              {node.content?.map((child, i) => {
                                    if(child.type === "paragraph") {
                                          return child.content?.map((c, j) => renderNode(c, j));
                                    }
                                    return renderNode(child, i);
                              })}
                        </li>
                  )

            case "codeBlock": {
                  const code = node.content?.map(child => child.text ?? "").join("") ?? "";
                  return (
                        <CodeBlock key={key} language={node.attrs?.language} code={code}></CodeBlock>
                  )
            }

            default:
                  return null
      }
}