
"use client";

import { useState, useMemo, type FormEvent } from "react";
import { FaGithub } from "react-icons/fa";
import HandwritteNote from "@/components/HandwrittenNote";
import DownloadSection from "@/components/DownloadSection";
import CompatibilityFAQ from "@/components/CompatibilityFAQ";
import CoolThings from "@/components/CoolThings";

import TechnicalGrid from "@/components/TechnicalGrid";
import CustomCursor from "@/components/CustomCursor";

import { ArrowDown, ArrowRight, Check, ChevronDown, Command, Copy, Search, ShieldCheck, Sparkles, Terminal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"

type CommandResult = {
  id: number;
  command: string;
  description: string;
  shell: string;
  time: string;
  tags: string[];
};

const examples: CommandResult[] = [
  {
    id: 1,
    command: "find . -type f -size +100M",
    description: "Find files larger than 100 MB",
    shell: "zsh",
    time: "2 days ago",
    tags: ["files", "find", "size", "disk"],
  },
  {
    id: 2,
    command: "du -ah . | sort -hr | head -n 20",
    description: "List the 20 largest files and directories",
    shell: "zsh",
    time: "5 days ago",
    tags: ["disk", "du", "storage"],
  },
  {
    id: 3,
    command: "find . -type f - name '*.log'",
    description: "Find all log files in this directory",

    shell: "bash",
    time: " 1 week ago",
    tags: ["files", "find", "logs"],
  },
]

const suggestions = [
  "find files larger than 100mb",
  "show processes using the most memory",
  "search my code for TODO comments",
  "show recent git commits",
];

function rankResults(query: string) {
  const terms = query.toLowerCase().split(/[^a-z0-9]+/).filter((term) => term.length > 1);

  return examples.map((item) => {
    const searchable = `${item.command} ${item.description} ${item.tags.join(" ")}`.toLowerCase();

    const matched = terms.filter((term) => searchable.includes(term));

    const score = terms.length ? matched.length / terms.length : 0;

    return { ...item, score }
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.id - b.id)
    .slice(0, 5);
}



export default function Home() {

  const [query, setQuery] = useState("find files larger than 100mb");
  const [submittedQuery, setSubmittedQuery] = useState(
    "find files larger than 100 mb",
  );

  const [selectedId, setSelectedId] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const results = useMemo(
    () => rankResults(submittedQuery),
    [submittedQuery],
  );


  const selected = results.find((item) => item.id == selectedId) ?? results[0];


  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query.trim());

    setSelectedId(-1);
    setDetailsOpen(false);
    setCopied(false);
  }


  async function copyCommand(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
    catch {
      setCopied(false);
    }
  }

  return (
    <>
      <main className="relative min-h-screen cursor-none [*_*]:cursor-none overflow-hidden bg-[#080a09] text-[#f1f3ed] selection:bg-lime-300 selection:text-black">
        <TechnicalGrid />
        <CustomCursor />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-lime-400/[0.07] blur-[140px]" />

          <div className="absolute -right-40 top-[500px] h-[500px] w-[500px] rounded-full bg-emerald-400/[0.05] blur-[140px]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px, transparent_1px), linear-gradient(90deg, rgba(255, 255, 255, 0.018)_1px, transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom, black, transparent_75%)]" />

        </div>


        {/* navigation */}

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-white/[0.08] px-5 py-5 sm:px-8 lg:px-12">
          <a href="#" className="flex items-center gap-3" aria-label="UNIV-ECHO home">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-lime-300/20 bg-lime-300/[0.08] text-lime-300">
              <Terminal size={20} />
            </span>

            <span className="text-2xl font-semibold tracking-tight">
              UNIV-ECHO
              <span className="text-lime-300">.</span>

            </span>
          </a>


          <nav className="hidden items-center gap-8 text-sm transition-all hover:cursor-pointer text-neutral-400 md:flex">
            <a className="transition hover:text-white" href="#demo">Live demo</a>
            <a className="transition hover:text-white" href="#requirements">Requirements</a>
            <a className="transition hover:text-white" href="#faq">FAQ</a> <a className="transition hover:text-white" href="#features">Features</a>
            <a className="transition hover:text-white" href="#getting-started">Get started</a>
          </nav>


          <a href="https://github.com/0Armaan025/univ-echo" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium transition hover:border-lime-300/30 hover:bg-lime-300/[0.06] sm:px-4">

            <FaGithub size={16} />
            <span className="hidden sm:inline">View on Github</span>
            <ArrowRight size={15} />
          </a>


        </header>



        {/* HEROOO */}


        <section className="relative z-10 mx-auto grid-max-w7xl items-center gap-16 px-5 pb-24 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:pb-32 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.06] px-3 py-2 text-[10px] font-semibold tracking-[0.2em] text-lime-300 sm:text-xs">

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300" />
              OPEN SOURCE - BUILT FOR YOUR TERMINAL (during Hack Club Terra)


            </div>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.065em] sm::text-6xl lg:text-7xl xl:text-[84px]">

              You forgot
              <br />
              the command.
              <br />
              <span className="bg-gradient-to-r from-lime-200 via-lime-300 to-emerald-400 bg-clip-text text-transparent">
                UNIV-ECHO didn&apos;t.
              </span>
            </h1>


            <p className="mt-8 max-w-lg text-base leading-7 text-neutral-400 sm:text-lg sm:leading-8">
              Search your command history by describing what you meant.
              No more digging through a thousand lines of terminal history.
            </p>


            <div className="mt-9 flex flex-wrap gap-3">

              <a href="#demo" className="group inline-flex items-center gap-3 rounded-xl bg-lime-300 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-200">

                Try the live demo
                <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </a>

              <a href="#getting-started" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-neutral-200 transition hover:border-white/20 hover:bg-white/[0.06">
                <Terminal size={16} />
                Install UNIV-ECHO
              </a>
            </div>

            <div className="mt-9 flex items-center gap-2 text-sm text-neutral-500">
              <ShieldCheck size={16} className="text-lime-300/80" />
              Designed for local-first command history

            </div>




          </motion.div>


          <motion.div

            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >

            <div className="absolute -inset-8 rounded-[40px] bg-lime-300[0.06] blur-3xl" />

            <div className="absolute -right-3 -top-20 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#111411] px-4 py-3 text-xs text-neutral-300 shadow-2xl sm:flex">

              <Sparkles size={15} className="text-lime-300" />
              Meaning, not just text
            </div>


            <div className="mt-10 relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c0f0d]/95 shadow-2xl shadow-black/40">

              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4 sm:px-5">

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>


                <span className="font-mono text-xs text-neutral-500">UNIV-ECHO - command search</span>
                <span className="rounded-md border border-lime-300/20 bg-lime-300/[0.06] px-2 py-1 font-mono text-[10px] text-lime-300">
                  DEMO
                </span>
              </div>


              <div className="p-5 sm:p-7">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-lime-300">)</span>
                  <span className="text-neutral-200">UNIV-ECHO search</span>
                </div>


                <div className="mt-4 rounded-lg border border-white/[0.07] bg-white[0.025] p-4 font-mono text-sm leading-6 text-neutral-300">

                  &quot;find that big file taking up space&quot;
                  <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-lime-300 align-middle" />
                </div>


                <div className="mb-3 mt-7 flex items-center justify-between font-mono text-[9px] tracking-[0.16em] text-neutral-600 sm:text-[10px]">
                  <span>3 MATCHING COMMANDS</span>
                  <span>LOCAL HISTORY</span>
                </div>


                {examples.slice(0, 3).map((item, index) => (

                  <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + index * 0.12 }}
                    className={`mb-2 flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer hover:scale-102 transition-all ${index === 0 ? "border-lime-300/20 bg-lime-300/[0.055]" : "border-transparent bg-white/[0.02]"}`}>
                    <span className="pt-0.5 font-mono text-xs text-neutral-600">
                      0{index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <code className="block break-all text-xs leading-5 text-neutral-200 sm:text-sm">
                        {item.command}
                      </code>

                      <span className="mt-1 block text-xs text-neutral-500">
                        {item.description}
                      </span>
                    </div>

                    <span className={`pt-1 font-mono text-[9px] ${index === 0 ? "text-lime-300" : "text-neutral-600"}`}>

                      {index === 0 ? "BEST" : "MATCH"}
                    </span>


                  </motion.div>

                ))}


                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[10px] text-neutral-600 sm:text-xs">

                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                    Ready for your next query
                  </span>
                  <span> ↑ ↓ navigate</span>
                </div>


              </div>

            </div>


            <div className="absolute -bottom-15 -left-[-2] hidden items-center gap-2 rounded-xl border border-white/10 bg-[#111411] px-4 py-3 text-xs text-neutral-300 shadow-2xl sm:flex">
              <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(190,242,100,0.6)]" />
              Find it. Understand it. Reuse it.
            </div>

          </motion.div>
        </section>


        {/* interactive demo */}

        <section id="demo" className="relative z-10 scroll-mt-10 border-y border-white/[0.06] bg-white/[0.015]">

          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

            <motion.div initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-12 max-w-2xl">

              <div className="mb-7 font-mono text-xs tracking-[0.2em] text-lime-400 underline underline-offset-5">

                01 / INTERACTIVE PLAYGROUND
              </div>
              <div className="mt-4 mb-4 ml-2">
                <HandwritteNote>
                  no need to remember the exact syntax
                </HandwritteNote>
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Think it.

                <span className="text-neutral-600"> Find it.</span>
              </h2>



              <p className="mt-5 max-w-xl leading-7 text-neutral-400">
                Try a query just like you would in UNIV-ECHO. This playground uses sample history so you can explore the experience instantly.
              </p>
            </motion.div>


            <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0b0e0c] shadow-2xl shadow-black/20">

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 sm:px-6 py-4">

                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.15em] text-neutral-500 sm:text-xs">
                    UNIV-ECHO / SEMANTIC SEARCH
                  </span>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-300/[0.05] px-3 py-1.5 font-mono text-[9px] tracking-wider text-amber-200/80 sm:text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  SIMULATED DEMO
                </span>

              </div>


              <div className="p-4 sm:p-6 lg:p-8">

                <form className="flex flex-col gap-3 rounded-xl border border-white/[0.12] bg-[#111411] p-2 sm:flex-row sm:items-center cursor-pointer" onSubmit={search}>

                  <Search size={19} className="ml-2 hidden shrink-0 text-neutral-500 sm:block" />
                  <input aria-label="Describe a command to search for"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Describe the command you remember..."
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-neutral-100 outline-none placeholder:text-neutral-600" />


                  {query && (
                    <button type="button" aria-label="Clear search"
                      onClick={() => setQuery("")}
                      className="hidden rounded-lg p-2 text-neutral-500 transition hover:bg-white/5 hover:text-white sm:block">

                      <X size={16} />
                    </button>
                  )}
                  <button type="submit" className="inline-flex items-center justify-center gap-3 rounded-lg bg-lime-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-line-200">
                    Search <span className="font-mono text-black/60">↵</span>
                  </button>
                </form>


                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="mr-1 font-mono text-[10px] tracking-widest text-neutral-600">
                    TRY:</span>

                  {suggestions.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => {
                      setQuery(suggestion);
                      setSubmittedQuery(suggestion);
                      setSelectedId(-1);
                      setDetailsOpen(false);
                      setCopied(false);
                    }}
                      className="rounded-full cursor-pointer border border-white/[0.09] bg-white/[0.02] px-3 py-2 text-left text-xs text-neutral-400 transition hover:border-lime-300/25 hover:bg-lime-300/[0.05] hover:text-lime-200">
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* results */}

                <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">

                  <div className="min-w-0 overflow-hidden rounded-xl border border-white/[0.08]">
                    <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-4">

                      <span className="font-mono text-[10px] tracking-[0.15em] text-neutral-500">
                        SEARCH RESULTS
                      </span>

                      <span className="font-mono text-xs text-neutral-600">
                        {results.length} FOUND
                      </span>
                    </div>


                    <AnimatePresence mode="wait">
                      <motion.div
                        key={submittedQuery}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="min-h-[320px] p-2">

                        {results.length ? (results.map((item, index) => (
                          <button key={item.id} type="button" onClick={() => {
                            setSelectedId(item.id);
                            setDetailsOpen(false);
                            setCopied(false);
                          }}

                            className={`group mb-1 flex w-full items-start gap-3 rounded-lg border p-3 text-left transition ${selected?.id === item.id ? "border-lime-300/20 bg-lime-300/[0.055]" : "border-transparent hover:border-white/[0.07] hover:bg-white/[0.025]"}`}>
                            <span className={`pt-0.5 font-mono text-xs ${selected?.id === item.id ? "text-lime-300" : "text-neutral-600"}`}>


                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="min-w-0 flex-1">
                              <code className="block break-all text-xs leading-5 text-neutral-200 sm:text-sm">
                                {item.command}
                              </code>


                              <span className="mt-1 block text-xs leading-5 text-neutral-500">
                                {item.description}
                              </span>

                              <span className="mt-3 flex items-center gap-2 font-mono text-[10px] text-neutral-600">
                                {item.shell}
                                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                                {item.time}
                              </span>

                            </span>
                            <ArrowRight size={15} className={`mt-1 shrink-0 transition group-hover:translate-x-0.5 ${selected?.id === item.id ? "text-lime-300" : "text-neutral-700"}`}
                            />
                          </button>
                        ))) : (


                          <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 px-4 text-center">

                            <Search size={23} className="text-neutral-600" />
                            <strong className="text-sm font-medium text-neutral-300">
                              Welp. Nothing in this sample history.
                            </strong>

                            <span className="max-w-xs text-xs leading-5 text-neutral-600">
                              Try a diff description or choose one of the suggestions above..
                            </span>
                          </div>
                        )}

                      </motion.div>

                    </AnimatePresence>


                    <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3 font-mono text-[10px] text-neutral-600">
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                        SAMPLE DATA
                      </span>

                      <span>DEMO MODE</span>
                    </div>
                  </div>


                  {/* command details */}


                  <div className="min-w-0 overflow-hidden rounded-xl border border-white/[0.08]">
                    <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-4">

                      <span className="font-mono text-[10px] tracking-[0.15em] text-neutral-500">
                        COMMAND DETAILS
                      </span>

                      <span className="flex items-center gap-4 font-mono text-[13px] text-neutral-600">

                        PREVIEW
                        <span className="h-1.5 w-1.5 rounded-full bg-lime-300 ">
                        </span>
                      </span>
                    </div>

                    {selected ? (
                      <AnimatePresence mode="wait">

                        <motion.div key={selected.id} initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="p-5 sm:p-6">

                          <div className="font-mono text-[10px] tracking-[0.15em] text-neutral-600">
                            COMMAND
                          </div>

                          <div className="mt-3 flex items-start gap-3 rounded-lg border border-white/[0.07] bg-black/20 p-4">

                            <span className="pt-0.5 text-lime-300">)</span>

                            <code className="break-all text-xs leading-6 text-neutral-200 sm:text-sm">
                              {selected.command}
                            </code>
                          </div>

                          <p className="mt-4 text-sm leading-6 text-neutral-400">
                            {selected.description}
                          </p>

                          <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="rounded-lg border border-white/[0.07] p-3">
                              <span className="block font-mono text-[9px] tracking-wider text-neutral-600">SHELL</span>
                              <strong className="mt-2 block text-sm font-medium text-neutral-300">{selected.shell}</strong>


                            </div>

                            <div className="rounded-lg border border-white/[0.07] p-3">
                              <span className="block font-mono text-[9px] tracking-wider text-neutral-600">

                                LAST USED
                              </span>


                              <strong className="mt-2 block text-sm font-medium text-neutral-300">{selected.time}</strong>
                            </div>


                          </div>


                          <div className="mt-4">
                            <span className="font-mono text-[9px] tracking-wider text-neutral-600">RELATED TAGS</span>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {selected.tags.map((tag) => (
                                <span key={tag} className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-1 text-[11px] text-neutral-400">
                                  {tag}</span>
                              ))}
                            </div>
                          </div>


                          {/* buton ig */}

                          <button type="button" onClick={() => copyCommand(selected.command)}
                            className={`mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${copied ? "border border-lime-300/20 bg-lime-300/[0.08] text-lime-300" : "bg-lime-300 text-black hover:bg-lime-200"}`}>

                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? "NICE." : "Copy command"}
                          </button>

                          <button type="button" onClick={() => setDetailsOpen((open) => !open)}
                            aria-expanded={detailsOpen}
                            className="mt-4 flex w-full items-center justify-between border-t border-white/[0.07] pt-4 text-left text-xs text-neutral-400 transition hover:text-white">

                            How this demo works
                            <ChevronDown size={15} className={`transition-transform ${detailsOpen ? "rotation-180" : ""}`} />
                          </button>

                          <AnimatePresence>

                            {detailsOpen && (
                              <motion.p initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden text-xs leading-6 text-neutral-500">

                                This browser demo ranks a small set of sample commands using keyword overlap. The actual UNIV-ECHO application uses a C++ search engine with semantic embeddings. No command is executed and your terminal history is never accessed.
                              </motion.p>

                            )}
                          </AnimatePresence>


                        </motion.div>
                      </AnimatePresence>
                    ) : (

                      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 p-6 text-center">
                        <Terminal size={24} className="text-neutral-600" />
                        <strong className="text-sm font-medium text-neutral-300">
                          No matching sample commands
                        </strong>

                        <span className="max-w-xs text-xs leading-5 text-neutral-600">
                          Choose a suggested query to explore the demo.
                        </span>
                      </div>
                    )}
                  </div>

                </div>


                <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-neutral-600">
                  <ShieldCheck size={15} className="mt-0.5 shrink-0 text-lime-300/70" />
                  <span> Nothing is executed. Commands shown here are examples only; this demo does not connect to your machine.</span>
                </div>



              </div>


            </div>
          </div>
        </section>


        {/* i should really have made components lol, i regret it now but yeah whatever */}
        {/* features ig */}

        <section id="features" className="relative z-10 mx-auto max-w-7xl scroll-mt-10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

          <div className="mb-12 max-w-2xl">
            <div className="mb-4 font-mono text-xs tracking-[0.2em] text-lime-300 underline underline-offset-5">
              {"02"} / BUILT DIFFERENTLY

            </div>
            <h2 className="text-4xl font-semibold tracking-[-0.3rem] sm:text-5xl">

              Less remembering.
              <span className="text-neutral-600"> More doing.</span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-neutral-400">
              Your command history is already full of answers. UNIV-ECHO helps you rediscover them.
            </p>
          </div>


          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: Search,
                title: "Search by meaning",
                description: "Describe what you were trying to do instead of remembering exact flags, arguments, and syntax.",
                foot: "NATURAL LANGUAGE",
              },
              {
                number: "02",
                icon: ShieldCheck,
                title: "Your history, your machine",
                description: "UNIV-ECHO is a local command-line tool. This website demo doesn't access your terminal or private history.",
                foot: "LOCAL-FIRST DESIGN",
              },
              {
                number: "03",
                icon: Command,
                title: "Made for the terminal",
                description: "A native C++ application with a terminal UI, command history, and semantic search.",
                foot: "C++20 · TUI",
              },
            ].map((feature) => {
              const FeatureIcon = feature.icon;

              return (
                <motion.article
                  key={feature.number}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-lime-300/20 hover:bg-white/[0.035] sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-lime-300/15 bg-lime-300/[0.06] text-lime-300 transition group-hover:bg-lime-300/[0.12]">
                      <FeatureIcon size={20} />
                    </div>
                    <span className="font-mono text-xs text-neutral-700">{feature.number}</span>
                  </div>

                  <h3 className="mt-9 text-xl font-medium tracking-tight text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="mt-3 min-h-20 text-sm leading-7 text-neutral-500">
                    {feature.description}
                  </p>
                  <div className="mt-7 border-t border-white/[0.07] pt-4 font-mono text-[10px] tracking-[0.15em] text-neutral-600">
                    {feature.foot}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
        {/* Getting started */}
        <section id="getting-started" className="relative z-10 scroll-mt-10 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0c0f0d] lg:grid-cols-2">
            <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-14">
              <div className="mb-5 font-mono text-xs tracking-[0.2em] text-lime-300 underline underline-offset-5">
                03 / GET STARTED
              </div>
              <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
                Your forgotten commands are waiting.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
                Explore the source, set up the dependencies, and run UNIV-ECHO locally.
                The project is open source and under active development.
              </p>
              <a
                href="https://github.com/0Armaan025/univ-echo"
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-lime-300 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-lime-200"
              >
                Explore the repository
                <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </a>
            </div>

            <div className="border-t border-white/[0.08] bg-black/20 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#080a09]">
                <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-neutral-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                    TERMINAL
                  </span>
                  <span className="font-mono text-[10px] text-neutral-600">bash</span>
                </div>

                <div className="space-y-3 overflow-x-auto p-4 font-mono text-[11px] leading-6 sm:p-6 sm:text-xs">
                  <p className="text-neutral-600"># Get the source</p>
                  <p className="whitespace-nowrap"><span className="text-lime-300">$</span> git clone https://github.com/0Armaan025/univ-echo.git</p>
                  <p className="whitespace-nowrap"><span className="text-lime-300">$</span> cd univ-echo</p>
                  <p className="pt-2 text-neutral-600"># Build with your project setup</p>
                  <p className="whitespace-nowrap"><span className="text-lime-300">$</span> cmake -S . -B build</p>
                  <p className="whitespace-nowrap"><span className="text-lime-300">$</span> cmake --build build -j2</p>
                  <p className="pt-2 text-neutral-600"># Launch ECHO</p>
                  <p className="whitespace-nowrap"><span className="text-lime-300">$</span> ./build/univecho</p>
                </div>

                <div className="flex items-start gap-2 border-t border-white/[0.07] px-4 py-3 text-xs leading-5 text-neutral-500">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-lime-300/70" />
                  Follow the README for dependencies and Ollama setup.
                </div>
              </div>
            </div>
          </div>
        </section>

        <DownloadSection />
        <CoolThings />
        {/* Footer */}
        <CompatibilityFAQ />
        <footer className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-white/[0.08] px-5 py-8 text-center sm:px-8 md:flex-row md:text-left lg:px-12">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-lime-300/15 bg-lime-300/[0.06] text-lime-300">
              <Terminal size={16} />
            </span>
            <span className="text-xl font-semibold tracking-tight">
              UNIV-ECHO<span className="text-lime-300">.</span>
            </span>
          </a>

          <span className="text-xs text-neutral-600 sm:text-sm">
            Built for the commands you almost remembered.
          </span>

          <a
            href="https://github.com/0Armaan025/univ-echo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-lime-300"
          >
            Open source <ArrowRight size={14} />
          </a>
        </footer>


      </main >

    </>

  );
}
