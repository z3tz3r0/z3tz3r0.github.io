# Portfolio — Agent Rules

## Protected Files

**CLAUDE.md** and **AGENTS.md** are protected. Do not modify, rewrite, weaken, or delete them.
A pre-commit hook enforces this. Bypass requires `--no-verify` with explicit human approval.

## Code Rules

1. **TypeScript strict mode** — all strict flags enabled, no `any`, no unused vars/params. Errors, not warnings.
2. **oxlint** — replaces ESLint entirely. All rules are `error` severity. Zero tolerance.
3. **Immutability** — never mutate. Always return new objects.
4. **No console.log** — oxlint enforces this. Dev-only logging requires explicit suppression comment with justification.

## Architecture Rules (Feature-Sliced Design)

1. **Layer imports are one-directional:**
   - `app` → `pages` → `widgets` → `features` → `entities` → `shared`
   - Never import upward. `shared` cannot import from any upper layer.
2. **One widget per section** — each page section (hero, skills, work, about, contact, footer, navbar) is a self-contained widget.
3. **Shared UI wraps library primitives** — HeroUI components re-exported through `shared/ui/` barrel files.
4. **Data co-located with widgets** — project data lives in `widgets/work/model/`, not in a global data folder.

## Animation Rules

1. **GSAP only** — no Framer Motion, no raw `useLayoutEffect` for animations.
2. **Always `useGSAP` hook** — never `useEffect` or `useLayoutEffect` for GSAP.
3. **Always `mm.revert()` cleanup** — every `gsap.matchMedia()` must return cleanup.
4. **Always check `prefers-reduced-motion`** — provide `gsap.set()` fallback.
5. **Set initial state before ScrollTrigger** — `gsap.set()` calls precede `ScrollTrigger.create()`.
6. **`contextSafe` in callbacks only** — never call at component body level.

## File Rules

1. Max 800 lines per file.
2. Max 50 lines per function.
3. One component per file for React components.
4. Organize by feature/domain (FSD layers), not by type.

## Commit Rules

1. Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `perf:`, `ci:`
2. Pre-commit runs: `oxlint --deny=correctness` via lint-staged.
3. Pre-push runs: `bun run validate` (type-check + full lint).
4. No secrets in commits. `.env` and `.mcp.json` are gitignored.

## Testing Rules

1. 80% coverage minimum.
2. TDD: write test first (RED), implement (GREEN), refactor (IMPROVE).
3. AAA pattern: Arrange, Act, Assert.

## What Not To Do

- Do not add ESLint. We use oxlint.
- Do not weaken TypeScript strict flags.
- Do not add `@ts-ignore` or `@ts-expect-error` without a linked issue.
- Do not store secrets in source code.
- Do not modify CLAUDE.md or AGENTS.md.
- Do not bypass the pre-commit hook without explicit human approval.
- Do not use Framer Motion or raw `useLayoutEffect` for animations.
