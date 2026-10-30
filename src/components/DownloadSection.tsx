"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Copy,
  Download,
  Terminal,
  Cpu, // Added for Ollama icon representation
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/0Armaan025/univ-echo/main/install.sh | bash";

const REPO_URL = "https://github.com/0Armaan025/univ-echo";
const RELEASES_URL = `${REPO_URL}/releases`;

export default function DownloadSection() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }

  return (
    <section
      id="download"
      className="relative z-10 scroll-mt-20 border-y border-white/10 bg-[#070908]"
    >
      <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8 lg:py-36">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-lime-400 uppercase mb-4 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
            04 / Instant Setup
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Get <span className="text-lime-400">Univ-Echo</span> running.
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-sm text-neutral-400 sm:text-base leading-relaxed">
            Replace your terminal history with a lightning-fast, local-first search engine built in C++20. No cloud accounts required.
          </p>
        </div>

        {/* HERO INSTALL BOX - Absolute Center Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden rounded-2xl border border-lime-400/30 bg-[#0d1210] shadow-[0_0_50px_-12px_rgba(163,230,53,0.15)]"
        >
          {/* Terminal Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-black/40">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-lime-400/80" />
              <span className="ml-3 font-mono text-[11px] text-neutral-400 tracking-wider">
                bash — linux x86_64
              </span>
            </div>

            <button
              type="button"
              onClick={copyCommand}
              className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-3.5 py-1.5 font-mono text-xs font-semibold text-black transition hover:bg-lime-300 active:scale-95"
              aria-label="Copy installation command"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied to Clipboard" : "Copy Command"}
            </button>
          </div>

          {/* Command Code Display */}
          <div className="p-6 sm:p-8 bg-black/60">
            <code className="block overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-lime-300 selection:bg-lime-400 selection:text-black">
              {INSTALL_COMMAND}
            </code>
          </div>

          {/* Footer details under command */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4 bg-white/[0.01] text-xs text-neutral-400">
            <span>📦 Installs cleanly to <code className="text-lime-300 font-mono">~/.local/bin</code> (No sudo needed)</span>
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-lime-400 hover:underline"
            >
              <Download size={13} />
              Manual download archive
            </a>
          </div>
        </motion.div>

        {copyFailed && (
          <p className="mt-3 text-center text-xs text-red-400">
            Clipboard access failed. Please select and copy the command manually.
          </p>
        )}

        {/* PREREQUISITES / OLLAMA SETUP SECTION */}
        <div className="mt-8 rounded-2xl border border-lime-400/20 bg-lime-400/[0.02] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-lime-400/10 p-3 text-lime-400 border border-lime-400/20">
              <Cpu size={22} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Ollama Model Prerequisite
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Univ-Echo requires a local Ollama instance running to handle vector embeddings. Make sure Ollama is installed and running on its default URL before querying:
              </p>

              <div className="mt-4 grid gap-3 font-mono text-xs">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 flex flex-col gap-1.5">
                  <span className="text-lime-400 font-semibold">1. Pull & Run the Embedding Model</span>
                  <code className="text-neutral-300 bg-black/60 p-2 rounded border border-white/5">
                    ollama run qwen3-embedding-0.6b-v1
                  </code>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 flex flex-col gap-1.5">
                  <span className="text-lime-400 font-semibold">2. Default Endpoint Connection</span>
                  <span className="text-neutral-400">
                    Univ-Echo automatically connects to Ollama at <code className="text-lime-300 font-mono">http://localhost:11434</code>.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROMINENT WARNING & COMPATIBILITY SECTION */}
        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400 border border-amber-500/20">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-amber-200">
                Important Platform & Compatibility Notice
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Univ-Echo is currently optimized specifically for Linux environments. Please review the current limitations before deploying:
              </p>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-3 font-mono text-xs">
                <div className="rounded-xl border border-white/10 bg-black/30 p-3.5">
                  <span className="block text-amber-400 font-semibold mb-1">Linux Target</span>
                  <span className="text-neutral-400">Primary and fully supported platform (Arch, Ubuntu, etc.)</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-3.5">
                  <span className="block text-amber-400 font-semibold mb-1">Windows Support</span>
                  <span className="text-neutral-400">Untested. Expect bugs and compatibility issues.</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-3.5">
                  <span className="block text-amber-400 font-semibold mb-1">Bash History</span>
                  <span className="text-neutral-400">Import tools for Bash are experimental and evolving.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Import Helpers */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#0d1210] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Terminal size={18} className="text-lime-400" />
              <h4 className="text-sm font-semibold text-white">Import Existing Zsh/Bash History</h4>
            </div>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Bring your legacy command histories straight into Univ-Echo instantly:
            </p>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="rounded-lg bg-black/50 border border-white/10 px-3 py-2.5 text-lime-300">
                univecho import-history
              </div>
              <div className="rounded-lg bg-black/50 border border-white/10 px-3 py-2.5 text-neutral-300">
                univecho import-history --shell zsh
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d1210] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FaGithub size={18} className="text-white" />
                <h4 className="text-sm font-semibold text-white">Open Source & Contributions</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Inspect the raw source code, check architecture guidelines, or compile directly from source code on GitHub.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-500">C++20 · Local-First</span>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-lime-400 hover:text-lime-300"
              >
                View Repository <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
