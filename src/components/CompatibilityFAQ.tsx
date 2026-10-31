"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown, CircleHelp, Cpu, Monitor, PackageCheck, ShieldCheck, Terminal, AlertTriangle } from "lucide-react";
import { TerminalIcon } from "lucide-react/dist/lucide-react.suffixed.js";
import { motion } from "framer-motion";


const platforms = [
  { name: "Linux x86_64", status: "Primary target", level: "ok", detail: "Current prebuilt release target." },
  { name: "Arch Linux", status: "Linux target", level: "ok", detail: "Linux is the intended environment." },

  { name: "Ubuntu / Debian", status: "Linux target", level: "ok", detail: "Linux distributions are the intended environment." },

  { name: "Windows", stuats: "Untested", level: "warn", detail: "Not currently a verified supported platform. Though, that said, it should work (build unavailable yet, please create an issue on github for testing purposes)." },
  { name: "MacOS", status: "Not verified", level: "neutral", detail: "A supported macOS build is not currently available..." }


];

const shells = [
  { name: "Zsh", status: "Available", level: "ok", detail: "Import existing Zsh history with the import command." },
  { name: "Bash", status: "Experimental", level: "warn", detail: "Bash history import is evolving ; results my vary though it should work as intended" },
  { name: "Cmd/Powershell", status: "Experimental", level: "warn", detail: "cmd/powershell history import is evolving ; results my vary though it should work as intended (build unavailable yet)" },

];

const faqs = [
  { q: "What does UNIV-ECHO do?", a: "It helps you find commands from your shell history by describing what you remember doing instead of recalling exact syntax." },
  { q: "Does the website demo search by terminal history?", a: "No. The browser playground uses sample commands and keyword matching. It cannot access your computer or execute commands." },
  { q: "Why do I need Ollama?", a: "The current semantic-search setup uses a locally running Ollama service to generate test embeddings. The setup guide currently lists qwen3-embedding-0.6b-v1." },
  { q: "Does my command history leave my machine?", a: "UNIV-ECHO is designed for local use with local Ollama endpoint (default only), Check the current source and documentation for the precise data flow before importing sensitive history (it does not leave your computer in conclusion)." },
  { q: "Which shells can I import history from?", a: "Zsh history import is available. Bash/cmd/powershell import is experimental and the results may vary acc to its formatting" },
  { q: "Can I Use UNIV-ECHO on Windows or MacOS?", a: "Windows is currently untested, and a build is unavailable, and a supported macOS build isn't available either... Linux is the only primary target as of now. Feel free to create an issue on github to get support for windows and macOS in the later versions" },
  { q: "Where can I report bugs or contribute?", a: "Open an issue or pull request in the Github repo. Include your: OS, shell, installation method, and relevant error output. It will help me to reproduce and check." }
];

function Status({ level, children }: { level: string; children: ReactNode }) {
  const style =
    level === "ok"
      ? "border-lime-300/20 bg-lime-300/[0.07] text-lime-300" : level === "warn" ? "border-amber-300/20 bg-amber-300/[0.07] text-amber-200" : "border-white/10 bg-white/[0.04] text-neutral-400";

  return (
    <span className={"inline-flex rounded-full border px-2.5 py-1 font-mono text-[10px] " + style}>
      {children}
    </span>
  );
}

export default function CompatibilityFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (

    <>

      <section id="requirements" className="relative z-10 border-y border-white/[0.07] bg-white/[0.015]">

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="mb-12 max-w-2xl">

            <div className="mb-4 underline underline-offset-5 font-mono text-xs tracking-[0.2em] text-lime-300">05 / SYSTEM CHECK</div>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Know what you need <span className="text-neutral-600"> before launch.</span>
          </h2>

          <p className="mt-5 leading-7 text-neutral-400">
            A quick reality check on the runtime, local embedding service, and current platform support.
          </p>
        </div>

        <div className="grid gap-4 mx-20 md:grid-cols-3">

          {[
            { icon: Terminal, label: "Application", value: "Linux x86_64", note: "Current prebuilt release target", tag: "C++20" },
            { icon: Cpu, label: "Semantic search", value: "Ollama", note: "Local service at localhost:11434", tag: "EMBEDDINGS" },
            { icon: PackageCheck, label: "Installation", value: "~/.local/bin", note: "Installer uses a user-local location", tag: "NO SUDO" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.label} whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/[0.09] bg-[#0c100d] p-6 transition hover:border-lime-300/25">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-lime-300/15 bg-lime-300/[0.06] text-lime-300">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-neutral-600">{item.tag}</span>
                </div>
                <p className="mt-7 text-xs text-neutral-500">{item.label}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">{item.value}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{item.note}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 mx-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-white/[0.09] bg-[#0c100d] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Monitor className="text-lime-300" size={19} />
              <h3 className="text-lg font-semibold">Platform compatiblity</h3>
            </div>

            <div className="space-y-3">
              {platforms.map((p) => (
                <div key={p.name} className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{p.name}</p>
                    <p className="mt-1 text-xs text-neutral-500">{p.detail}</p>
                  </div>

                  <Status level={p.level}>{p.status}</Status>

                </div>
              ))}
            </div>
          </div>


          <div className="rounded-2xl border border-white/[0.09] bg-[#0c100d] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Terminal className="text-lime-300" size={19} />
              <h3 className="text-lg font-semibold">Shell history</h3>
            </div>

            <div className="space-y-3">
              {shells.map((s) => (
                <div key={s.name} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex flex-wrap justify-between gap-2 items-center">
                    <span className="font-medium text-neutral-200">{s.name}</span>
                    <Status level={s.level}>{s.status}</Status>
                  </div>

                  <p className="mt-2 text-xs leading-6 text-neutral-500">{s.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2 rounded-xl border border-amber-300/15 bg-amber-300/[0.04] text-xs p-4 leading-5 text-amber-100/70">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-300" />
              Compatibility can change b/w releases. Check the README and release notes before installing.
            </div>
          </div>
        </div>

      </section>

      <section id="faq" className="relative z-10 mx-auto max-w-4xl scroll-mt-16 px-5 py-24 sm:px-8 lg:py-28">
        <div className="mb-10 text-center">
          <div className="mb-4 font-mono text-xs underline underline-offset-5 tracking-[0.2em] text-lime-300 mb-6">06 / QUESTIONS, ANSWERED</div>

          <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Curious? <span className="text-neutral-600">Good.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-500">The useful details, without the mystery</p>
        </div>


        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.q} className={"overflow-hidden rounded-xl border transition-colors " +
                (isOpen ? "border-lime-300/20 bg-lime-300/[0.025]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]")}>
                <button type="button" aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
                  <span className="flex items-center gap-3 text-sm font-medium text-neutral-200 sm:text-base">
                    <CircleHelp size={17} className={isOpen ? "text-lime-300" : "text-neutral-600"} />
                    {faq.q}
                  </span>
                  <ChevronDown size={17} className={"shrink-0 text-neutral-500 transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="border-t border-white/[0.06] px-5 py-4 pl-12 text-sm leading-7 text-neutral-400">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-500">
          <ShieldCheck size={14} className="text-lime-300" />
          Still unsure?
          <a className="text-lime-300 transition hover:text-lime-200"
            href="https://github.com/0Armaan025/univ-echo" target="_blank" >
            Read the source and README!
          </a>
          <h3 className="font-mono text-lg text-white">Also don't forget to ⭐ the repo! Thanks :D</h3>
        </div>

      </section>
    </>
  );
}
