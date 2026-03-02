# Logan's Skills

A curated collection of [Agent Skills](https://agentskills.io/home) reflecting [Logan](https://github.com/iml885203)'s workflow, tools, and best practices. Forked from [antfu/skills](https://github.com/antfu/skills).

> [!NOTE]
> Custom skills are hand-maintained for personal productivity. Upstream skills from antfu are kept in sync for Vue/Vite/Nuxt development.

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

### Custom Skills

> Hand-maintained by Logan

| Skill | Description |
|-------|-------------|
| [confluence](skills/confluence) | Confluence Cloud REST API — search, read, create, update, delete pages |

### Hand-maintained Skills (from antfu)

> Opinionated

| Skill | Description |
|-------|-------------|
| [antfu](skills/antfu) | Anthony Fu's preferences and best practices for app/library projects |

### Skills Generated from Official Documentation

> Unopinionated but with tilted focus (TypeScript, ESM, Composition API, modern stacks)

| Skill | Description | Source |
|-------|-------------|--------|
| [vue](skills/vue) | Vue.js core - reactivity, components, composition API | [vuejs/docs](https://github.com/vuejs/docs) |
| [nuxt](skills/nuxt) | Nuxt framework - file-based routing, server routes, modules | [nuxt/nuxt](https://github.com/nuxt/nuxt) |
| [pinia](skills/pinia) | Pinia - type-safe state management for Vue | [vuejs/pinia](https://github.com/vuejs/pinia) |
| [vite](skills/vite) | Vite build tool - config, plugins, SSR, library mode | [vitejs/vite](https://github.com/vitejs/vite) |
| [vitepress](skills/vitepress) | VitePress - static site generator powered by Vite | [vuejs/vitepress](https://github.com/vuejs/vitepress) |
| [vitest](skills/vitest) | Vitest - unit testing framework powered by Vite | [vitest-dev/vitest](https://github.com/vitest-dev/vitest) |
| [unocss](skills/unocss) | UnoCSS - atomic CSS engine, presets, transformers | [unocss/unocss](https://github.com/unocss/unocss) |
| [pnpm](skills/pnpm) | pnpm - fast, disk space efficient package manager | [pnpm/pnpm.io](https://github.com/pnpm/pnpm.io) |

### Vendored Skills

Synced from external repositories that maintain their own skills.

| Skill | Description | Source |
|-------|-------------|--------|
| [slidev](skills/slidev) (Official) | Slidev - presentation slides for developers | [slidevjs/slidev](https://github.com/slidevjs/slidev) |
| [tsdown](skills/tsdown) (Official) | tsdown - TypeScript library bundler powered by Rolldown | [rolldown/tsdown](https://github.com/rolldown/tsdown) |
| [turborepo](skills/turborepo) (Official) | Turborepo - high-performance build system for monorepos | [vercel/turborepo](https://github.com/vercel/turborepo) |
| [vueuse-functions](skills/vueuse-functions) (Official) | VueUse - 200+ Vue composition utilities | [vueuse/skills](https://github.com/vueuse/skills) |
| [vue-best-practices](skills/vue-best-practices) | Vue 3 + TypeScript best practices | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [vue-router-best-practices](skills/vue-router-best-practices) | Vue Router best practices | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [vue-testing-best-practices](skills/vue-testing-best-practices) | Vue testing best practices | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [web-design-guidelines](skills/web-design-guidelines) | Web design guidelines for building beautiful interfaces | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |

## Sync Upstream

```bash
git fetch upstream
git merge upstream/main
```

## Generate Your Own Skills

See [antfu/skills](https://github.com/antfu/skills) for the full guide on forking and generating custom skill collections.

## License

Skills and scripts in this repository are [MIT](LICENSE.md) licensed.

Vendored skills from external repositories retain their original licenses.
