"use client";

import { type FC, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckIcon, CopyIcon } from "lucide-react";
import type { Components } from "react-markdown";

import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { cn } from "@/lib/utils";

interface CodeHeaderProps {
  language: string;
  code: string;
}

interface MarkdownTextProps {
  children: string;
  className?: string;
}

const MarkdownTextImpl: FC<MarkdownTextProps> = ({ children, className }) => {
  const components: Components = {
    h1: ({ children, ...props }) => (
      <h1 className="mb-8 scroll-m-20 text-2xl font-extrabold tracking-tight last:mb-0" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="mb-4 mt-8 scroll-m-20 text-md font-semibold tracking-tight first:mt-0 last:mb-0" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="mb-4 mt-6 scroll-m-20 text-md font-semibold tracking-tight first:mt-0 last:mb-0" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="mb-4 mt-6 scroll-m-20 text-md font-semibold tracking-tight first:mt-0 last:mb-0" {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 className="my-4 text-md font-semibold first:mt-0 last:mb-0" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 className="my-4 font-semibold first:mt-0 last:mb-0" {...props}>
        {children}
      </h6>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 mt-4 leading-7 first:mt-0 last:mb-0" {...props}>
        {children}
      </p>
    ),
    a: ({ children, ...props }) => (
      <a className="text-primary font-medium underline underline-offset-4" {...props}>
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-2 pl-6 italic" {...props}>
        {children}
      </blockquote>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props}>
        {children}
      </ol>
    ),
    hr: ({ ...props }) => (
      <hr className="my-5 border-b" {...props} />
    ),
    table: ({ children, ...props }) => (
      <table className="my-5 w-full border-separate border-spacing-0 overflow-y-auto" {...props}>
        {children}
      </table>
    ),
    th: ({ children, ...props }) => (
      <th className="bg-muted px-4 py-2 text-left font-bold first:rounded-tl-lg last:rounded-tr-lg [&[align=center]]:text-center [&[align=right]]:text-right" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-b border-l px-4 py-2 text-left last:border-r [&[align=center]]:text-center [&[align=right]]:text-right" {...props}>
        {children}
      </td>
    ),
    tr: ({ children, ...props }) => (
      <tr className="m-0 border-b p-0 first:border-t [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg" {...props}>
        {children}
      </tr>
    ),
    sup: ({ children, ...props }) => (
      <sup className="[&>a]:text-xs [&>a]:no-underline" {...props}>
        {children}
      </sup>
    ),
    code: (props) => {
      const { node, className, children, ...rest } = props;
      const inline = (props as any).inline;
      const match = /language-(\w+)/.exec(className || "");
      const language = match?.[1] || "";
      const codeString = String(children).replace(/\n$/, "");

      if (!inline && match) {
        return (
          <div className="relative text-sm">
            <CodeHeader language={language} code={codeString} />
            <SyntaxHighlighter
              style={oneDark as any}
              language={language}
              PreTag="div"
              className="!mt-0 !rounded-t-none !rounded-b-lg"
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        );
      }

      return (
        <code className="bg-muted rounded border font-semibold px-1 py-0.5" {...rest}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className={cn(" max-w-none prose-invert", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export const MarkdownText = memo(MarkdownTextImpl);

const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const onCopy = () => {
    if (!code || isCopied) return;
    copyToClipboard(code);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="lowercase [&>span]:text-xs">{language}</span>
      <TooltipIconButton tooltip="Copy" onClick={onCopy}>
        {!isCopied && <CopyIcon />}
        {isCopied && <CheckIcon />}
      </TooltipIconButton>
    </div>
  );
};

const useCopyToClipboard = ({
  copiedDuration = 3000,
}: {
  copiedDuration?: number;
} = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), copiedDuration);
    });
  };

  return { isCopied, copyToClipboard };
};
