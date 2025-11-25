## 1. Implementation

- [ ] 1.1 Create `(site)` wrapper layout (globals + dev user switcher) and nest `(marketing)` + `(auth)` route groups; move landing, legal, and auth pages accordingly.
- [ ] 1.2 Move signed-in product flows under `(site)/(app)/**`, including shared `_components` shells, flights (search + booking), orders, home/account pages, and `/error`.
- [ ] 1.3 Relocate Fumadocs helpers out of `src/lib` (to `src/fumadocs/**`) and update docs routes/imports.
- [ ] 1.4 Update project docs/config references (e.g., `openspec/project.md`, CSS imports, not-found page) to reflect the new structure.
- [ ] 1.5 Run validations/lint/tests relevant to the change (at minimum `pnpm openspec validate refactor-frontend-structure --strict`; add lint/test runs if time permits) and summarize results.
