# Tasks: Separate Pages Output Directory

## Implementation Order

### Phase 1: Preparation (5 minutes)

1. **Review current configuration**
   - ✅ Confirm all occurrences of `public/` in deploy-pages.yml
   - ✅ Confirm all occurrences of `public/` in generate-dashboard.js
   - ✅ Check if `.gitignore` already has `public/` entries

### Phase 2: Configuration Updates (40 minutes)

2. **Update .gitignore** ✅
   - ✅ Add `_pages/` to ignore list
   - ✅ Add comment explaining this is for CI/CD GitHub Pages artifacts
   - ✅ Verify `public/` is NOT in gitignore (needed for Next.js static assets)
   - **Validation**: `git check-ignore _pages/test.txt` returns positive ✅

3. **Update deploy-pages.yml workflow** ✅
   - ✅ Replace `public/` with `_pages/` in "Extract and organize artifacts" step (5 occurrences):
     - ✅ `mkdir -p _pages/playwright-report _pages/coverage _pages/storybook`
     - ✅ `cp -r artifacts/playwright-report-merged/* _pages/playwright-report/`
     - ✅ `cp -r artifacts/test-results/* _pages/coverage/`
     - ✅ `cp -r artifacts/storybook-static/* _pages/storybook/`
     - ✅ `ls -la _pages/`
   - ✅ Update "Upload artifact" step path from `"./public"` to `./_pages`
   - **Validation**: YAML syntax check passes (`yamllint` or editor validation) ✅

4. **Update generate-dashboard.js script** ✅
   - ✅ Update `ensureDir("public")` to `ensureDir("_pages")` (line ~318)
   - ✅ Update `copyDir("reports/playwright", "public/playwright")` to `copyDir("reports/playwright", "_pages/playwright")` (line ~323)
   - ✅ Update `copyDir("reports/coverage", "public/coverage")` to `copyDir("reports/coverage", "_pages/coverage")` (line ~326)
   - ✅ Update `fs.writeFileSync("public/index.html", dashboardHtml)` to `fs.writeFileSync("_pages/index.html", dashboardHtml)` (line ~336)
   - ✅ Update console logs referencing `public/` directory
   - **Validation**: No linting errors (`pnpm lint scripts/generate-dashboard.js`) ✅

### Phase 3: Local Testing (30 minutes)

5. **Test script locally** ✅
   - ✅ Create mock `reports/` structure with sample data
   - ✅ Run `node scripts/generate-dashboard.js`
   - ✅ Verify `_pages/` directory is created
   - ✅ Verify `_pages/index.html` exists and contains correct content
   - ✅ Verify `_pages/playwright/`, `_pages/coverage/` directories exist
   - ✅ Clean up test artifacts
   - **Validation**: Script runs without errors, files in correct locations ✅

6. **Test workflow syntax** ✅
   - ✅ Use GitHub Actions VS Code extension or `actionlint` to validate YAML
   - ✅ Check for any path references we might have missed
   - **Validation**: No syntax errors or warnings ✅

### Phase 4: Integration Testing (30-60 minutes)

7. **Create test branch and push** ⏸️
   - Commit changes with message: `chore(ci): separate GitHub Pages output to _pages directory`
   - Push to remote branch
   - **Validation**: Commit follows conventional commits format
   - **Status**: Ready for commit - awaiting user action

8. **Trigger workflow run** ⏸️
   - Either push a code change or manually trigger workflow
   - Monitor workflow execution in GitHub Actions
   - **Validation**: Workflow runs to completion without errors
   - **Status**: Requires CI/CD environment

9. **Verify deployment** ⏸️
   - Check GitHub Pages deployment succeeds
   - Access deployed dashboard URL
   - Verify all links work (Storybook, Playwright, Coverage)
   - Verify no 404 errors on subpages
   - **Validation**: All reports accessible, no broken links
   - **Status**: Requires CI/CD deployment

10. **Verify PR comment (if applicable)** ⏸️
    - If triggered by PR, check PR comment is created
    - Verify all URLs in comment work correctly
    - **Validation**: PR comment shows correct URLs
    - **Status**: Requires PR context

### Phase 5: Cleanup & Documentation (15 minutes)

11. **Verify .gitignore works** ✅
    - ✅ Create a test file in `_pages/`
    - ✅ Run `git status` and confirm file is ignored
    - ✅ Delete test file
    - **Validation**: `_pages/` directory not shown in `git status` ✅

12. **Update related documentation (if any)** ✅
    - ✅ Check if any README or docs reference the `public/` CI output
    - ✅ Update references to `_pages/`
    - **Validation**: No stale documentation references ✅

## Validation Checklist

After completing all tasks:

- [x] `.gitignore` includes `_pages/` entry
- [x] `deploy-pages.yml` has no references to `public/` for CI artifacts
- [x] `generate-dashboard.js` has no references to `public/` for output
- [ ] Workflow runs successfully on CI (requires remote execution)
- [ ] GitHub Pages deploys successfully (requires remote execution)
- [ ] Dashboard is accessible at Pages URL (requires remote execution)
- [ ] All report links work (Storybook, Playwright, Coverage) (requires remote execution)
- [ ] PR comments (if applicable) show correct URLs (requires PR context)
- [x] Local script execution works correctly
- [x] `_pages/` directory is ignored by git
- [x] No regressions in test report generation
- [x] Linting passes (`pnpm lint`) - syntax validated

## Rollback Plan

If issues occur:

1. Revert commits: `git revert <commit-hash>`
2. Or manually restore original paths:
   - Change `_pages/` back to `public/` in all modified files
   - Remove `_pages/` from `.gitignore`
3. Push changes
4. Re-trigger workflow

## Notes

- This change is purely a path rename, no logic changes
- The deployed URL structure remains unchanged (GitHub Pages serves `_pages/` content as root)
- Next.js `public/` directory is unaffected and continues to work normally
- Parallelizable tasks: Tasks 3 and 4 can be done simultaneously
- Dependencies: Task 5 depends on Task 4; Tasks 8-10 depend on Task 7
