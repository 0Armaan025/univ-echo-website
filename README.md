# UNIV-ECHO

You forgot the command. UNIV-ECHO didn't.

A local-first terminal tool that searches your command history by meaning. Not syntax. Not flags. Just describe what you were trying to do and find it.

## What it is

UNIV-ECHO is a C++ native CLI with a terminal UI. It indexes your shell history and lets you search it with natural language descriptions. The web demo on this site uses a small sample set. The real thing runs on your machine.

## Try the demo first

The site has a live interactive playground. Go to the [Live demo](#demo) section, type something like "find big files" and see how it ranks results. Nothing runs on your machine. It's simulated.

## Why I built it

I kept forgetting exact commands. I know what I want to do — clean up disk space, find logs, check git status — but the exact syntax slips away. Rather than digging through hundreds of lines of history, I wanted to search by intent.

## Features

- Search command history by describing your goal
- Local-first: your data never leaves your machine
- Native C++20 application with a terminal UI
- Semantic ranking, not just keyword matching

## Stack

- Next.js 16, React 19, TypeScript
- Framer Motion for animations
- Tailwind CSS v4
- Custom cursor, handwritten notes, dark terminal aesthetic

## Installation

```bash
git clone https://github.com/0Armaan025/univ-echo.git
cd univ-echo
cmake -S . -B build
cmake --build build -j2
./build/univecho
```

Dependencies and Ollama setup are covered in the repo README.

## Status

Built for Hack Club Terra. Open source and actively developed. The website is the landing page; the actual engine lives in the C++ repository.

## Links

- [GitHub repository](https://github.com/0Armaan025/univ-echo)
- [Live demo](#demo) on this site

Built for the commands you almost remembered.
