# Default recipe to display available commands
default:
    @just --list

# Package the project into a zip file for submission
# Uses git archive to only include tracked files
# Excludes files marked with export-ignore in .gitattributes
package output="submission.zip":
    #!/usr/bin/env bash
    set -euo pipefail
    
    # Get current branch name
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    
    # Create zip using git archive (only includes tracked files)
    git archive --format=zip --output="{{output}}" HEAD
    
    echo "✅ Package created: {{output}}"
    echo "📦 Files from branch: $BRANCH"
    echo "ℹ️  Only git-tracked files are included (node_modules, .env, etc. are excluded)"
    
    # Show package size
    if command -v du &> /dev/null; then
        SIZE=$(du -h "{{output}}" | cut -f1)
        echo "📊 Package size: $SIZE"
    fi

# Package with custom name based on current branch and date
package-auto:
    #!/usr/bin/env bash
    set -euo pipefail
    
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    DATE=$(date +%Y%m%d-%H%M%S)
    FILENAME="nomad-${BRANCH}-${DATE}.zip"
    
    just package "$FILENAME"

# List files that would be included in the package
package-list:
    @echo "📋 Files that will be included in the package:"
    @git ls-files

# Check package contents without creating it
package-check:
    @echo "📋 Checking what would be packaged..."
    @git ls-files | wc -l | xargs echo "Total files:"
    @echo ""
    @echo "📁 Directory breakdown:"
    @git ls-files | cut -d'/' -f1 | sort | uniq -c | sort -rn

# Verify the contents of an existing package
package-verify zip="submission.zip":
    @echo "📦 Contents of {{zip}}:"
    @unzip -l "{{zip}}"
