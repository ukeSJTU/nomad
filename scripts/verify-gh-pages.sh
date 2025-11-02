#!/bin/bash

# Verify GitHub Pages deployment
echo "🔍 Verifying GitHub Pages deployment..."
echo ""

BASE_URL="https://ukesjtu.github.io/nomad"

echo "📍 Base URL: $BASE_URL"
echo ""

# Test main dashboard
echo "Testing main dashboard..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ Main dashboard: $BASE_URL/ (HTTP $STATUS)"
else
    echo "❌ Main dashboard: $BASE_URL/ (HTTP $STATUS)"
fi

# Test Storybook
echo "Testing Storybook..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/storybook/")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ Storybook: $BASE_URL/storybook/ (HTTP $STATUS)"
else
    echo "❌ Storybook: $BASE_URL/storybook/ (HTTP $STATUS)"
fi

# Test Playwright report
echo "Testing Playwright report..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/playwright-report/")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ Playwright report: $BASE_URL/playwright-report/ (HTTP $STATUS)"
else
    echo "❌ Playwright report: $BASE_URL/playwright-report/ (HTTP $STATUS)"
fi

# Test Coverage report
echo "Testing Coverage report..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/coverage/")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ Coverage report: $BASE_URL/coverage/ (HTTP $STATUS)"
else
    echo "❌ Coverage report: $BASE_URL/coverage/ (HTTP $STATUS)"
fi

echo ""
echo "📝 Summary:"
echo "If all tests pass, your GitHub Pages is correctly deployed!"
echo "If some tests fail, check the GitHub Actions logs for deployment issues."

