# Logan's Skills

A curated collection of [Agent Skills](https://agentskills.io/home) reflecting [Logan](https://github.com/iml885203)'s workflow, tools, and best practices. Forked from [antfu/skills](https://github.com/antfu/skills).

## Installation

```bash
pnpx skills add iml885203/skills --skill='*'
```

or install a specific skill:

```bash
pnpx skills add iml885203/skills --skill=confluence
```

Install globally:

```bash
pnpx skills add iml885203/skills --skill='*' -g
```

Learn more about the CLI usage at [skills](https://github.com/vercel-labs/skills).

## Skills

### Hand-maintained Skills

| Skill | Description |
|-------|-------------|
| [confluence](skills/confluence) | Confluence Cloud REST API — search, read, create, update, delete pages |

## Sync Upstream

```bash
git fetch upstream
git merge upstream/main
```

## FAQ

### What Makes This Collection Different?

This collection is opinionated, but the key difference is that it uses git submodules to directly reference source documentation. This provides more reliable context and allows the skills to stay up-to-date with upstream changes over time. If you primarily work with Vue/Vite/Nuxt, this aims to be a comprehensive one-stop collection.

The project is also designed to be flexible - you can use it as a template to generate your own skills collection.

### Skills vs llms.txt vs AGENTS.md

To me, the value of skills lies in being **shareable** and **on-demand**.

Being shareable makes prompts easier to manage and reuse across projects. Being on-demand means skills can be pulled in as needed, scaling far beyond what any agent's context window could fit at once.

You might hear people say "AGENTS.md outperforms skills". I think that's true — AGENTS.md loads everything upfront, so agents always respect it, whereas skills can have false negatives where agents don't pull them in when you'd expect. That said, I see this more as a gap in tooling and integration that will improve over time. Skills are really just a standardized format for agents to consume—plain markdown files at the end of the day. Think of them as a knowledge base for agents. If you want certain skills to always apply, you can reference them directly in your AGENTS.md.

## Generate Your Own Skills

Fork this project to create your own customized skill collection.

1. Fork or clone this repository
2. Install dependencies: `pnpm install`
3. Update `meta.ts` with your own projects and skill sources
4. Run `pnpm start cleanup` to remove existing submodules and skills
5. Run `pnpm start init` to clone the submodules
6. Run `pnpm start sync` to sync vendored skills
7. Ask your agent to `Generate skills for <project>` (recommended one at a time to manage token usage)

See [AGENTS.md](AGENTS.md) for detailed generation guidelines.

## License

Skills and scripts in this repository are [MIT](LICENSE.md) licensed.

Vendored skills from external repositories retain their original licenses.
