"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Copy,
  Download,
  Monitor,
  Package,
  Terminal,
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
      className="relative z-10 scroll-mt-20 border-y border-white/10 bg-[#0a0d0b]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-lime-300">
              <span className="h-px w-7 bg-lime-300" />
              04 / GET YOUR COPY
            </div>

            <h2 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl">
              Your terminal.
              <br />
              <span className="text-lime-300">A better memory.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
              Stop digging through your command history. Find what you need,
              understand it, and get back to work.
            </p>
          </div>

          <div className="font-mono text-[10px] leading-6 tracking-wider text-neutral-600">
            <div>PROJECT: UNIV-ECHO</div>
            <div>LANGUAGE: C++20</div>
            <div>PLATFORM: LINUX</div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Terminal preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden border border-white/10 bg-[#080a09]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime-300/70" />
              </div>

              <span className="font-mono text-[10px] tracking-widest text-neutral-600">
                UNIV-ECHO / TERMINAL
              </span>
            </div>

            <div className="min-h-[330px] p-6 font-mono text-xs leading-7 sm:p-9 sm:text-sm">
              <div className="text-neutral-600">
                # Your command history, reimagined.
              </div>

              <div className="mt-7">
                <span className="text-lime-300">armaan@machine</span>
                <span className="text-neutral-500">:</span>
                <span className="text-sky-300">~</span>
                <span className="text-neutral-400">$</span>
                <span className="ml-2 text-neutral-200">
                  univecho
                </span>
              </div>

              <div className="mt-5 text-neutral-500">
                Initializing UNIV-ECHO...
              </div>
              <div className="text-neutral-500">
                Loading local command database...
              </div>
              <div className="text-lime-300">
                Ready. Your history is yours.
              </div>

              <div className="mt-8 border-t border-white/[0.07] pt-5">
                <div className="text-neutral-500">
                  Search your past commands.
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lime-300">&gt;</span>
                  <span className="text-neutral-200">
                    find commands related to docker
                  </span>
                  <span className="h-4 w-1.5 animate-pulse bg-lime-300" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-4">
              <span className="text-xs text-neutral-500">
                Your commands. Your machine. Your control.
              </span>
              <span className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-neutral-600">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                LOCAL-FIRST
              </span>
            </div>
          </motion.div>

          {/* Download panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-between border border-white/10 bg-[#0d110e] p-6 sm:p-8"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500">
                  DOWNLOAD / INSTALL
                </span>
                <Package size={18} className="text-lime-300" />
              </div>

              <h3 className="mt-8 text-3xl font-semibold tracking-tight">
                Get UNIV-ECHO.
              </h3>

              <p className="mt-3 text-sm leading-7 text-neutral-500">
                Get started with one command or download the release archive
                and install it manually.
              </p>

              {/* Linux */}
              <div className="mt-9 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <Terminal size={19} className="text-lime-300" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-200">
                      Linux
                    </h4>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      x86_64 · Arch · Ubuntu · Other distributions
                    </p>
                  </div>
                </div>

                {/* Install command */}
                <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-[#080a09]">
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-3 py-2">
                    <span className="font-mono text-[9px] tracking-widest text-neutral-500">
                      QUICK INSTALL · BASH
                    </span>

                    <button
                      type="button"
                      onClick={copyCommand}
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] text-neutral-400 transition hover:bg-white/[0.06] hover:text-lime-300"
                      aria-label="Copy Linux installation command"
                    >
                      {copied ? (
                        <Check size={12} />
                      ) : (
                        <Copy size={12} />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <code className="block overflow-x-auto whitespace-nowrap px-3 py-3 font-mono text-[10px] leading-5 text-lime-200 sm:text-[11px]">
                    {INSTALL_COMMAND}
                  </code>
                </div>

                {copyFailed && (
                  <p className="mt-2 text-[10px] text-red-300">
                    Clipboard access failed. Please copy the command manually.
                  </p>
                )}

                <p className="mt-2 text-[10px] leading-5 text-neutral-600">
                  Installs to ~/.local/bin. No sudo required.
                </p>

                {/* Manual download */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[10px] text-neutral-600">
                    MANUAL DOWNLOAD
                  </span>

                  <a
                    href={RELEASES_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-lime-300 transition hover:text-lime-200"
                  >
                    <Download size={14} />
                    Linux release archive
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Windows */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <Monitor size={19} className="text-neutral-500" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-300">
                      Windows
                    </h4>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      Windows x64 · Coming later
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Source code */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 px-4 py-4 transition hover:border-lime-300/30 hover:bg-lime-300/[0.035]"
              >
                <div className="flex items-center gap-3">
                  <FaGithub size={19} />
                  <div>
                    <span className="block text-sm font-medium">
                      Build from source
                    </span>
                    <span className="mt-1 block text-[11px] text-neutral-500">
                      Explore the GitHub repository
                    </span>
                  </div>
                </div>

                <ArrowDownRight
                  size={18}
                  className="text-neutral-500 transition group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-lime-300"
                />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 font-mono text-[9px] tracking-wider text-neutral-600 sm:flex-row">
          <span>NO ACCOUNTS. NO CLOUD HISTORY. YOUR MACHINE.</span>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition hover:text-lime-300"
          >
            SOURCE CODE <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
