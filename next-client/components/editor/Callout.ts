import { Node, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
      interface Commands<ReturnType> {
            callout: {
                  toggleCallout: () => ReturnType
            }
      }
}

export const CalloutExtension = Node.create({
      name: 'callout',
      group: 'block',
      content: 'block+',
      defining: true,

      parseHTML() {
            return [
                  { 
                        tag: 'div[data-type="callout"]',
                  },
            ]
      },

      renderHTML({ HTMLAttributes }) {
            return [
                  'div',
                  mergeAttributes(HTMLAttributes, {
                        'data-type': 'callout',
                        class: 'editor-callout',
                  }),
                  0,
            ]
      },

       addCommands() {
            return {
                  toggleCallout: () => ({ commands }) => {
                        return commands.toggleWrap(this.name)
                  },
            }
      },
})