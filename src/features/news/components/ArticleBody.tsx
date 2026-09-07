import { Fragment } from "react";

/**
 * Very small block renderer for the plain-text article field. Supports:
 *   ## Heading      → h2
 *   ### Heading     → h3
 *   - item / * item → bullet list
 *   1. item         → numbered list
 *   blank line      → new paragraph
 * (No typography plugin in this project, so styles are explicit.)
 */
export function ArticleBody({ text }: { text: string }) {
  const blocks = text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5 text-slate-600 leading-relaxed">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="text-lg font-bold text-slate-900 mt-8 mb-2"
            >
              {block.slice(4)}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="text-xl sm:text-2xl font-bold text-slate-900 mt-10 mb-3"
            >
              {block.slice(3)}
            </h2>
          );
        }

        const lines = block.split("\n");
        if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5">
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^\s*[-*]\s+/, "")}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
          return (
            <ol key={i} className="list-decimal pl-5 space-y-1.5">
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^\s*\d+\.\s+/, "")}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={i}>
            {lines.map((l, j) => (
              <Fragment key={j}>
                {l}
                {j < lines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
