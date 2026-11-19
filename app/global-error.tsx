"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Something went wrong | omon.dev</title>
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#090a0d",
          color: "#f4f5f7",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          padding: "1.5rem",
        }}
      >
        <main style={{ maxWidth: "32rem", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "0.75rem",
              color: "#38bdf8",
              marginBottom: "0.75rem",
            }}
          >
            500 // UNEXPECTED ERROR
          </div>
          <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.75rem" }}>
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#9ca3af",
              lineHeight: 1.6,
              margin: "0 0 1.5rem",
            }}
          >
            An unexpected error occurred while rendering this page. You can try
            again or return to the homepage.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{
                height: "2.5rem",
                padding: "0 1rem",
                borderRadius: "0.5rem",
                border: "none",
                backgroundColor: "#f4f5f7",
                color: "#090a0d",
                fontWeight: 500,
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/en"
              style={{
                height: "2.5rem",
                padding: "0 1rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "#14161c",
                color: "#f4f5f7",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Back to Home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
