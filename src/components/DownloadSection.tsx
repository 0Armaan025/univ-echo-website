"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Monitor, Play, Terminal, Download, Package } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type DownloadSectionProps = {
  videoSrc?: string;
  posterSrc?: string;
};

export default function DownloadSection({
  videoSrc,
  posterSrc,
}: DownloadSectionProps) {
  const releasesUrl = "https://github.com/0Armaan025/univ-echo/releases";

  const repoUrl = "https://github.com/0Armaan025/univ-echo";

  return (
    <section id="download" className="relative z-10 scroll-mt-16 border-y border-white/10 bg-[#0a0d0b]">


      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

        {/* //heading */}

        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-lime-300">
              <span className="h-px w-7 bg-lime-300 underline underline-offset-5" />
              04 / GET YOUR COPY

            </div>


            <h2 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl">
              Your Terminal
              <br />
              <span className="text-lime-300">A bettery memory.</span>
            </h2>


            <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
              Stop digging through your history. Find the command, understand it, and get back to work.
            </p>
          </div>


          <div className="font-mono text-[10px] leading-6 tracking-wider text-neutral-600">
            <div>PROJECT: UNIV-ECHO</div>
            <div>LANGUAGE: C++20</div>
            <div>LICENSE: OPEN SOURCE</div>
          </div>



        </div>

        {/* layout */}

        {/* Main layout */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Video panel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden border border-white/10 bg-[#080a09]"
          >

            <div className="relative aspect-video overflow-hidden bg-[#0c100d]">
              {videoSrc ? (
                <video
                  className="h-full w-full object-contain"
                  controls
                  preload="metadata"
                  poster={posterSrc}
                  playsInline
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden p-6 text-center">
                  {/* Video placeholder grid */}
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(190,210,175,0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(190,210,175,0.07) 1px, transparent 1px)
                      `,
                      backgroundSize: "28px 28px",
                    }}
                  />

                  <div className="relative flex flex-col items-center">
                    <div className="mb-5 grid h-16 w-16 place-items-center rounded-full border border-lime-300/30 bg-lime-300/[0.07] text-lime-300">
                      <Play size={25} fill="currentColor" />
                    </div>

                    <span className="font-mono text-[10px] tracking-[0.2em] text-lime-300">
                      VIDEO DEMONSTRATION
                    </span>

                    <h3 className="mt-3 text-xl font-medium text-neutral-200 sm:text-2xl">
                      See how UNIV-ECHO works.
                    </h3>

                    <p className="mt-2 max-w-xs text-xs leading-6 text-neutral-500">
                      The walkthrough will appear here once the demo
                      recording is ready.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-4">
              <span className="text-xs text-neutral-500">
                A quick look inside the UNIV-ECHO workflow.
              </span>

              <span className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-neutral-600">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                {videoSrc ? "VIDEO AVAILABLE" : "RECORDING PENDING"}
              </span>
            </div>
          </motion.div>

          {/* Download panel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
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
                Find the latest published builds or explore the source
                code and build it yourself.
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
                      Arch · Ubuntu · Other distributions
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-neutral-600">
                    RELEASE BUILDS
                  </span>
                  <a
                    href={releasesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-lime-300 transition hover:text-lime-200"
                  >
                    View releases <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Windows */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <Monitor size={19} className="text-lime-300" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-200">
                      Windows
                    </h4>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      Windows x64
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-neutral-600">
                    RELEASE BUILDS
                  </span>
                  <a
                    href={releasesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-lime-300 transition hover:text-lime-200"
                  >
                    View releases <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Source code */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <a
                href={repoUrl}
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

        {/* Footer strip */}
        <div className="mt-8 flex flex-col justify-between gap-3 font-mono text-[9px] tracking-wider text-neutral-600 sm:flex-row">
          <span>NO ACCOUNTS. NO CLOUD HISTORY. YOUR MACHINE.</span>
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition hover:text-lime-300"
          >
            SOURCE CODE <ArrowRight size={12} />
          </a>
        </div>
      </div>    </section>

  );

}
