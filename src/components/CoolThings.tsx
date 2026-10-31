"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, RotateCcw, Sparkles } from "lucide-react";

const notes = [
  {
    text: "im sure i used this command last week.",
    author: "me, ig",
    color: "bg-[#e5edbd]",
    ink: "text-[#303b25]",
    rotate: "-rotate-2",
  },
  {
    text: "future me: you're welcome.",
    author: "past me",
    color: "bg-[#e9d9b9]",
    ink: "text-[#493b29]",
    rotate: "-rotate-2",
  },
  {
    text: "wait... what was that flag again?",
    author: "everyone who codes ig",
    color: "bg-[#d5e5dc]",
    ink: "text-[#294438]",
    rotate: "-rotate-1",
  },
];

function Doodles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 500 150"
        fill="none"
        className="absolute -right-5 top-0 w-44 text-lime-300/70 sm:right-8 sm:w-56"
      >
        <path
          d="M15 90 C65 15 115 20 145 65 S220 125 265 55"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M251 55 L266 53 L260 68"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M350 28 L356 43 L372 49 L356 55 L350 71 L344 55 L328 49 L344 43 Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M410 92 Q430 70 450 92"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

    </div>

  );
}

export default function CoolThings() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [relatable, setRelatable] = useState(false);

  return (
    <section id="story" className="mx-20 my-10 p-4 relative z-10 overflow-hidden border-y border-white/[0.07] bg-[#0a0d0b]">
      <Doodles />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

        <div className="relative inline-block">
          <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Made out of {" "}
            <span className="text-lime-300">a lil bit of frustration.</span>
          </h2>

        </div>
      </div>


      {/* story */}

      <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <p className="text-lg leading-9 text-neutral-300">
            I kept running into the same stupid problem.
          </p>

          <p className="mt-5 text-sm leading-8 text-neutral-400 sm:text-base">
            I knew I'd used a command before. I remembered what it did,
            sometimes even why I'd needed it. But the actual command?
            Gone.
          </p>

          <p className="mt-5 text-sm leading-8 text-neutral-400 sm:text-base">
            So instead of digging through endless history entries,
            I started building something that could help me find
            commands by describing what I remembered.
          </p>

          <p className="mt-5 text-sm leading-8 text-neutral-400 sm:text-base">
            That's basically how UNIV-ECHO happened. It's still a work
            in progress, and there's a lot left to improve.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setRelatable(!relatable)}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs text-neutral-300 transition hover:border-lime-300/30 hover:bg-lime-300/[0.05] hover:text-lime-200"
            >
              <Heart
                size={14}
                className={relatable ? "fill-lime-300 text-lime-300" : "transition group-hover:text-lime-300"}
              />
              {relatable ? "okay, we're alike." : "you've done this too, right?"}
            </button>

            <span className="text-xs text-neutral-600">
              {relatable ? "🤝 command forgetters club." : "no judgement here."}
            </span>
          </div>
        </motion.div>

        {/* Sticky notes */}
        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4 sm:gap-5">
          {notes.map((note, index) => {
            const isFlipped = flipped === index;

            return (
              <motion.button
                key={note.text}
                type="button"
                onClick={() => setFlipped(isFlipped ? null : index)}
                whileHover={{ y: -7, rotate: 0, scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                className={`${note.color} ${note.ink} ${note.rotate} relative flex min-h-36 flex-col justify-between p-5 text-left shadow-xl shadow-black/20 transition sm:min-h-40 ${index === 2 ? "col-span-2 mx-auto w-[65%]" : ""
                  }`}
              >
                <span className="absolute left-1/2 top-0 h-3 w-10 -translate-x-1/2 -translate-y-1/2 rotate-2 bg-white/30" />

                {isFlipped ? (
                  <>
                    <RotateCcw size={16} />
                    <span className="text-sm font-medium leading-6">
                      {index === 0
                        ? "That's literally why ECHO exists."
                        : index === 1
                          ? "Past you did absolutely nothing. ECHO might help."
                          : "Describe it. Find it. Carry on."}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    <span className="font-mono text-sm font-semibold leading-6 sm:text-base">
                      {note.text}
                    </span>
                  </>
                )}

                <span className="mt-4 flex items-center justify-between text-[10px] opacity-60">
                  {isFlipped ? "BACK TO NOTE" : `— ${note.author}`}
                  <ArrowUpRight size={13} />
                </span>
              </motion.button>
            );
          })}

          <span className="absolute -bottom-8 right-2 -rotate-6 font-mono text-[10px] text-neutral-600">
            click the notes. go on.
          </span>
        </div>
      </div>

      <div className="mt-20 border-t border-white/[0.07] pt-6 text-xs text-neutral-600">
        <span className="font-mono text-lime-300/80">P.S.</span>{" "}
        This is very much a work in progress. That's part of the fun.
      </div>


    </section >
  );
}
