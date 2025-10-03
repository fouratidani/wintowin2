# PowerShell script to fix API_BASE configuration in all route files

# Get all route.ts files
$routeFiles = Get-ChildItem -Path "app\api" -Recurse -Name "route.ts" | ForEach-Object { "app\api\$_" }

Write-Host "Found $($routeFiles.Count) route files to fix"

foreach ($file in $routeFiles) {
    Write-Host "Processing: $file"
    
    # Read file content
    $content = Get-Content $file -Raw
    
    # Replace the backwards API_BASE configuration
    $newContent = $content -replace "const API_BASE = process\.env\.NODE_ENV === 'production' \s*\? 'http://localhost:5000/api' \s*: 'https://winstowin\.com/api'", "const API_BASE = process.env.NODE_ENV === 'production' `n  ? 'https://winstowin.com/api' `n  : 'http://localhost:5000/api'"
    
    # Write back to file
    Set-Content -Path $file -Value $newContent -NoNewline
    
    Write-Host "Fixed: $file"
}

Write-Host "All route files have been updated!"