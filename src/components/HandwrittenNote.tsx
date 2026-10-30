import type { ReactNode } from "react";

type HandWrittenNoteProps = {
  children: ReactNode;
  className?: string;
};

export default function HandwritteNote({
  children,
  className = "",
}: HandWrittenNoteProps) {
  return (
    <span className={`inline-flex -rotate-2 items-center gap-2 font-serif text-sm italic tracking-wide text-lime-300/80 ${className}`}>

      <svg
        viewBox="0 0 34 18"
        fill="none"
        className="h-4 w-8 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M2 3C9 3 16 6 23 12M17 7L23 12L25 5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </span>
  );
}
