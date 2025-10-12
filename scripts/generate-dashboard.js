#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

// Ensure directories exist
const ensureDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Read JSON file safely
const readJsonFile = filePath => {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (error) {
    console.warn(`Failed to read ${filePath}:`, error.message);
  }
  return null;
};

// Copy directory recursively
const copyDir = (src, dest) => {
  if (!fs.existsSync(src)) return;

  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// Generate dashboard HTML
const generateDashboard = (playwrightData, coverageData) => {
  const timestamp = new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Dashboard - Nomad Project</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧪</text></svg>">
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card-hover {
            transition: all 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .pulse-dot {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    </style>
</head>
<body class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <header class="mb-12 text-center">
            <div class="gradient-bg text-white rounded-2xl p-8 shadow-xl">
                <h1 class="text-5xl font-bold mb-4 flex items-center justify-center">
                    <span class="mr-4">🧪</span>
                    Test Dashboard
                    <span class="ml-4">📊</span>
                </h1>
                <p class="text-xl opacity-90 mb-2">Nomad Project - Quality Assurance Hub</p>
                <div class="flex items-center justify-center space-x-4 text-sm">
                    <span class="flex items-center">
                        <span class="w-2 h-2 bg-green-400 rounded-full pulse-dot mr-2"></span>
                        Live Status
                    </span>
                    <span>•</span>
                    <span>Last updated: ${new Date(timestamp).toLocaleString()}</span>
                </div>
            </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <!-- Playwright Tests Card -->
            <div class="bg-white rounded-xl shadow-lg p-8 card-hover border border-gray-100">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                        <span class="text-3xl mr-3">🎭</span>
                        E2E Tests
                    </h2>
                    <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Playwright</span>
                </div>
                ${generatePlaywrightSection(playwrightData)}
                <div class="mt-6">
                    <a href="../playwright-report/index.html" class="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                        <span class="mr-2">📋</span>
                        View Detailed Report
                    </a>
                </div>
            </div>

            <!-- Unit Tests Card -->
            <div class="bg-white rounded-xl shadow-lg p-8 card-hover border border-gray-100">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                        <span class="text-3xl mr-3">🧪</span>
                        Unit Tests
                    </h2>
                    <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Vitest</span>
                </div>
                ${generateCoverageSection(coverageData)}
                <div class="mt-6">
                    <a href="../coverage/index.html" class="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
                        <span class="mr-2">📊</span>
                        View Coverage Report
                    </a>
                </div>
            </div>
        </div>

        <!-- Coverage Chart -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-12 card-hover border border-gray-100">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                    <span class="text-3xl mr-3">📈</span>
                    Coverage Overview
                </h2>
                <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Real-time</span>
            </div>
            <div class="w-full h-80">
                <canvas id="coverageChart"></canvas>
            </div>
        </div>

        <footer class="text-center text-gray-500 text-sm">
            <p>Generated automatically by GitHub Actions</p>
        </footer>
    </div>

    <script>
        ${generateChartScript(coverageData)}
    </script>
</body>
</html>`;
};

const generatePlaywrightSection = data => {
  if (!data) {
    return '<p class="text-gray-500">No Playwright test data available</p>';
  }

  const stats = data.stats || {};
  const total = stats.expected || 0;
  const passed = stats.passed || 0;
  const failed = stats.failed || 0;
  const skipped = stats.skipped || 0;

  return `
    <div class="space-y-3">
        <div class="flex justify-between">
            <span>Total Tests:</span>
            <span class="font-semibold">${total}</span>
        </div>
        <div class="flex justify-between">
            <span>Passed:</span>
            <span class="font-semibold text-green-600">${passed}</span>
        </div>
        <div class="flex justify-between">
            <span>Failed:</span>
            <span class="font-semibold text-red-600">${failed}</span>
        </div>
        <div class="flex justify-between">
            <span>Skipped:</span>
            <span class="font-semibold text-yellow-600">${skipped}</span>
        </div>
        <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: ${total > 0 ? (passed / total) * 100 : 0}%"></div>
            </div>
            <p class="text-sm text-gray-600 mt-1">Success Rate: ${total > 0 ? Math.round((passed / total) * 100) : 0}%</p>
        </div>
    </div>
  `;
};

const generateCoverageSection = data => {
  if (!data || !data.total) {
    return '<p class="text-gray-500">No coverage data available</p>';
  }

  const { lines, statements, functions, branches } = data.total;

  return `
    <div class="space-y-3">
        <div class="flex justify-between">
            <span>Lines:</span>
            <span class="font-semibold">${lines.pct}%</span>
        </div>
        <div class="flex justify-between">
            <span>Statements:</span>
            <span class="font-semibold">${statements.pct}%</span>
        </div>
        <div class="flex justify-between">
            <span>Functions:</span>
            <span class="font-semibold">${functions.pct}%</span>
        </div>
        <div class="flex justify-between">
            <span>Branches:</span>
            <span class="font-semibold">${branches.pct}%</span>
        </div>
    </div>
  `;
};

const generateChartScript = coverageData => {
  if (!coverageData || !coverageData.total) {
    return 'console.log("No coverage data for chart");';
  }

  const { lines, statements, functions, branches } = coverageData.total;

  return `
    const ctx = document.getElementById('coverageChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lines', 'Statements', 'Functions', 'Branches'],
            datasets: [{
                label: 'Coverage %',
                data: [${lines.pct}, ${statements.pct}, ${functions.pct}, ${branches.pct}],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(168, 85, 247, 1)',
                    'rgba(245, 158, 11, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
  `;
};

// Main execution
const main = () => {
  // eslint-disable-next-line no-console
  console.log("Generating test dashboard...");

  // Ensure public directory exists
  ensureDir("public");

  // Copy Playwright reports
  copyDir("reports/playwright", "public/playwright");

  // Copy coverage reports
  copyDir("reports/coverage", "public/coverage");

  // Read test data
  const playwrightData = readJsonFile("reports/playwright/results.json");
  const coverageData = readJsonFile("reports/coverage/coverage-summary.json");

  // Generate dashboard
  const dashboardHtml = generateDashboard(playwrightData, coverageData);

  // Write dashboard
  fs.writeFileSync("public/index.html", dashboardHtml);

  // eslint-disable-next-line no-console
  console.log("Dashboard generated successfully!");
};

if (require.main === module) {
  main();
}

module.exports = { generateDashboard };
