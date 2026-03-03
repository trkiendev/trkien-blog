import { Extension } from '@tiptap/core'

export const CodeBlockTabIndent = Extension.create({
      name: 'codeBlockTabIndent',

      addKeyboardShortcuts() {
            return {
                  Tab: ({ editor }) => {
                        if (!editor.isActive('codeBlock')) return false

                        const { state, dispatch } = editor.view
                        const { from, to } = state.selection
                        const text = state.doc.textBetween(from, to, '\n')

                        // Nếu không select gì → insert 4 spaces
                        if (from === to) {
                              editor.commands.insertContent('    ')
                              return true;
                        }

                        // Multi-line indent
                        const lines = text.split('\n')
                        const indented = lines.map(line => '    ' + line).join('\n')

                        dispatch(state.tr.insertText(indented, from, to))

                        return true
                  },

                  'Shift-Tab': ({ editor }) => {
                        if (!editor.isActive('codeBlock')) return false

                        const { state, dispatch } = editor.view
                        const { from, to } = state.selection
                        const text = state.doc.textBetween(from, to, '\n')

                        const lines = text.split('\n')

                        const outdented = lines.map(line => {
                              if (line.startsWith('    ')) {
                                    return line.slice(4)
                              }
                              if (line.startsWith('\t')) {
                                    return line.slice(1)
                              }
                              return line;
                        }).join('\n')

                        dispatch(state.tr.insertText(outdented, from, to))

                        return true
                  },
            }
      },
})