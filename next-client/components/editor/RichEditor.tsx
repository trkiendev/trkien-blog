"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight, common } from 'lowlight'
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import {  Bold, Code, Highlighter, Italic, List, MessageSquareQuote, SquareChartGantt, SquareCode } from "lucide-react";
import { CodeBlockTabIndent } from "./CodeBlockTabIndent";
import { CalloutExtension } from "./Callout";
import { useEffect } from "react";

interface Props {
      value: any;
      onChange: (value: any) => void;
}

const lowlight = createLowlight(common);

export default function RichEditor({ value, onChange }: Props) {
      const editor = useEditor({
            extensions: [
                  StarterKit.configure({
                        codeBlock: false
                  }),
                  CodeBlockLowlight.configure({
                        lowlight,
                        defaultLanguage: 'csharp'
                  }),
                  CodeBlockTabIndent,
                  CalloutExtension,
                  Highlight,
                  Placeholder.configure({
                        placeholder: "Write your blog content...",
                  }),
            ],
            content: value,
            immediatelyRender: false,
            onUpdate({ editor }) {
                  onChange(editor.getJSON()); // lưu JSONB
            },
      });

      useEffect(() => {
            if (editor && value) {
                  editor.commands.setContent(value);
            }
      }, [editor, value]);

      if (!editor) return null;

      return (
            <div className="border border-[#cbcaca] rounded-md bg-white">
                  {/* Toolbar */}
                  <div className="border-b border-[#cbcaca] flex items-center rounded-t-md gap-2 border-b px-3 py-2 bg-[#f6f8fa]">

                        {/* bold */}
                        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
                        className="px-2 py-1 text-sm border rounded hover:bg-gray-200">
                              <Bold size={13} strokeWidth={2}/>
                        </button>

                        {/* Italic */}
                        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
                        className="px-2 py-1 text-sm border rounded hover:bg-gray-200">
                              <Italic size={13} strokeWidth={2}/>
                        </button>

                        {/* Highlight */}
                        <button type="button"
                              onClick={() => editor.chain().focus().toggleHighlight().run()}
                              className={`px-2 py-1 text-sm border rounded hover:bg-gray-200 ${
                                    editor.isActive("highlight") ? "bg-yellow-200" : ""
                              }`}
                        >
                              <Highlighter size={13} strokeWidth={2}/>
                        </button>

                        {/* Heading 1 */}
                        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className="px-2 py-1 text-sm border rounded hover:bg-gray-200">
                              <span className="font-bold">H1</span>
                        </button>

                        {/* Heading 2 */}
                        <button type="button"
                              onClick={() =>
                                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                              }
                              className={`px-2 py-1 text-sm border rounded hover:bg-gray-200 ${
                                    editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
                              }`}
                        >
                              <span className="font-bold">H2</span>
                        </button>

                        {/* Heading 3 */}
                        <button type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run() }
                        className={`px-2 py-1 text-sm border rounded hover:bg-gray-200 ${
                              editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""
                        }`}>
                              <span className="font-bold">H3</span>
                        </button>

                        {/* Bullet */}
                        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className="px-2 py-1 text-sm border rounded hover:bg-gray-200">
                              <List size={13} strokeWidth={2}/>
                        </button>

                        {/* Blockquote */}
                        <button type="button"
                              onClick={() => editor.chain().focus().toggleBlockquote().run()}
                              className={`px-2 py-1 text-sm border rounded hover:bg-gray-200 ${
                                    editor.isActive("blockquote") ? "bg-gray-300" : ""
                              }`}
                        >
                              <SquareChartGantt size={13} strokeWidth={2}/>
                        </button>

                        {/* Inline Code */}
                        <button type="button"
                              onClick={() => editor.chain().focus().toggleCode().run()}
                              className={`px-2 py-1 text-sm border rounded hover:bg-gray-200 ${
                                    editor.isActive("code") ? "bg-gray-300" : ""
                              }`}
                        >
                              <Code size={13} strokeWidth={2}/>
                        </button>

                        {/* CodeBlock */}
                        <button type="button"
                              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                              className={`px-2 py-1 text-sm border rounded hover:bg-gray-200 ${
                                    editor.isActive("codeBlock") ? "bg-gray-300" : ""
                              }`}
                        >
                              <SquareCode size={13} strokeWidth={2}/>
                        </button>

                        {/* Callout */}
                        <button type="button"
                              onClick={() => editor.chain().focus().toggleCallout().run()}
                              className={`px-2 py-1 text-sm border rounded hover:bg-gray-200 ${
                                    editor.isActive("callout") ? "bg-yellow-200" : ""
                              }`}
                        >
                              <MessageSquareQuote size={13} strokeWidth={2}/>
                        </button>
                  </div>

                  {/* Editor area */}
                  <div className="p-2 h-[800px] prose max-w-none overflow-y-auto">
                        <EditorContent editor={editor} />
                  </div>
            </div>
      );
}