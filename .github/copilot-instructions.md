<!-- GitHub Copilot instructions for AI coding agents working on this repo -->

# Repo orientation — quick context

- **Project:** Advent of Code solutions (many years). Each year is a top-level folder like `2015/`, `2016/`, ..., `2025/`.
- **Per-day layout:** each day typically lives in `YYYY/dayNN/` and contains:
  - `solution.js` (primary script)
  - optionally `solution2.js` (alternative/part-2), `control.txt` (example inputs), `data.txt` (puzzle input)
- **Runtimes & style:** simple Node.js scripts. `package.json` at repo root declares `"type": "module"` and a few dependencies — but many scripts are standalone JS files that are run with `node`.

# What makes this codebase unique (helpful, concrete patterns)

- Single-file solutions: Most puzzle implementations are small, self-contained scripts that read their input file (usually `data.txt`) and print answers to stdout. Example: `2015/day01/solution.js`.
- Test/control inputs: The repo keeps sample inputs alongside real inputs. Look for `control.txt`, `control1.txt`, `control2.txt` for small testcases — use these when adding or validating logic changes.
- Part-2 convention: If a day has a second part, authors either modify `solution.js` or add `solution2.js`. When modifying, prefer adding a clear, minimal change that preserves the original behavior for part-1 if both are needed.
- Helpers and re-use: Shared utilities live in `helpers/` (e.g., `helpers/permutator.js`) and at repo root (`range.js`). Reuse these instead of adding duplicate helper code when appropriate.
- Minimal dependencies: `package.json` contains `combinatorics`, `js-combinatorics`, `md5`, and a couple others. Many solutions do not import external packages — prefer keeping changes dependency-free unless strictly necessary.

# Typical developer workflows (explicit commands)

- Run a single solution locally:
  - `node 2015/day01/solution.js` (or `node 2015/day01/solution2.js`)
- Debug with a sample input: replace reading path or run with `control.txt` where scripts support it. Example run pattern: `node 2015/day02/solution.js < 2015/day02/control.txt` if the script reads stdin.
- Install dependencies (rarely needed): `npm install` in repository root to populate listed packages in `package.json`.

# File/implementation conventions for AI edits

- Keep changes minimal and targeted: modify only the day's folder unless you are adding a shared helper.
- Preserve I/O conventions: solutions expect `data.txt` or `control.txt`. When adding tests or examples, follow existing file naming and directory layout.
- Don't change global `package.json` scripts unless you add a project-wide tool or test script used across many days.
- Follow the repository's informal style: small, readable JS functions, few external dependencies, no added license headers.

# Integration points and places to inspect for cross-cutting behavior

- `helpers/` — utility functions used by multiple days; prefer adding to `helpers/` rather than duplicating.
- Root-level `range.js` — small utility that is sometimes used across solutions.
- `leetCode/` folder — separate workspace; avoid mixing LeetCode-specific changes into AoC solutions.

# When you edit or add a solution — concrete checklist for AI agents

- Check for an existing `control.txt` before adding tests; use the same directory to place test inputs.
- Match the existing filename conventions: `solution.js` for the canonical run, `solution2.js` for alternate/part2 code.
- If adding a helper that may be reusable, place it under `helpers/` and update only the few files that need it.
- Keep the change surface small: update only the files necessary for the task and leave other days untouched.

# Examples (explicit snippets from this repo)

- `2015/day03/solution.js` — typical small script: read `data.txt`, compute result, console.log answer.
- `2016/day01/test.js` — shows small test harnesses used in some years. Use similar lightweight patterns for new tests.

# Notes for PRs and review

- Provide a short description: what puzzle/day you changed and whether you validated with `control.txt`.
- If you add or modify `helpers/`, include a minimal example showing the helper in use (a single day's `solution.js` change is enough).

# If you need more context

- Inspect a few representative directories to understand local conventions: `2015/`, `2016/`, `2020/` (some years have many days implemented).
- If uncertain whether to add a dependency, ask for human confirmation — most solutions are dependency-free.

---
If any of these conventions are incorrect or you want additional examples (e.g., sample I/O patterns for a specific day), tell me which parts to expand and I will update this file.