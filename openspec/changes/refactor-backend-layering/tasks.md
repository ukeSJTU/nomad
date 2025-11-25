# 1. Implementation

- [x] 1.1 Create `src/lib/repositories` structure and move existing query modules there
- [x] 1.2 Refactor services to delegate database access to repositories and keep business logic in `src/lib/services`
- [x] 1.3 Update presentation entrypoints (`src/app/api/**` and server-side callers) to use services/repositories via the new paths
- [x] 1.4 Run validation (`openspec validate refactor-backend-layering --strict`) and note follow-up tests
