import { ArrowUpRight, GitBranch, Mail, Send, Terminal } from "lucide-react";
import { CopyCodeButton } from "@/components/copy-code-button";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import type { PortfolioUiStrings } from "@/lib/portfolio/types";

export interface SiteFooterProps {
  email: string;
  emailElementId?: string;
  links: {
    telegram: string;
    instagram: string;
    github: string;
  };
  ui: PortfolioUiStrings["footer"];
}

export function SiteFooter({
  email,
  emailElementId = "footer-email-address",
  links,
  ui,
}: SiteFooterProps) {
  return (
    <footer className="deferred-footer border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold text-foreground">
            <Terminal className="size-4 text-[var(--signal)]" />
            <span>omon.dev</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">@omon.dev</span>
          </div>
          <p className="text-xs text-muted-foreground">{ui.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
            <Mail className="size-3.5 text-[var(--signal)]" />
            <span
              id={emailElementId}
              className="font-mono text-xs text-foreground"
            >
              {email}
            </span>
            <CopyCodeButton
              targetId={emailElementId}
              ariaLabel={ui.copyEmailLabel}
            />
          </div>

          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 font-mono text-xs text-foreground hover:bg-muted transition-colors"
          >
            <Send className="size-3.5 text-[var(--signal)]" />
            <span>{ui.telegram}</span>
            <ArrowUpRight className="size-3" />
          </a>

          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 font-mono text-xs text-foreground hover:bg-muted transition-colors"
          >
            <InstagramIcon className="size-3.5" />
            <span>@omon.dev</span>
            <ArrowUpRight className="size-3" />
          </a>

          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <GitBranch className="size-3.5" />
            <span>{ui.github}</span>
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
