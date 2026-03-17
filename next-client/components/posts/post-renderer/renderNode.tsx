import CodeBlock from "@/components/code/codeBlock"

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

            case "codeBlock":
                  return (
                        <CodeBlock
                              key={key}
                              language={node.attrs?.language}
                              code={node.attrs?.code}
                        />
                  )

            default:
                  return null
      }
}