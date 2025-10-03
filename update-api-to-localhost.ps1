# PowerShell script to update API_BASE to use localhost in both dev and prod

# Get all route.ts files
$routeFiles = Get-ChildItem -Path "app\api" -Recurse -Name "route.ts" | ForEach-Object { "app\api\$_" }

Write-Host "Found $($routeFiles.Count) route files to update"

foreach ($file in $routeFiles) {
    Write-Host "Processing: $file"
    
    # Read file content
    $content = Get-Content $file
    
    # Find and replace the API_BASE line
    $newContent = @()
    $inApiBase = $false
    
    foreach ($line in $content) {
        if ($line -match "const API_BASE = process\.env\.NODE_ENV === 'production'") {
            $newContent += "const API_BASE = process.env.NODE_ENV === 'production' "
            $newContent += "  ? 'http://localhost:5000/api' "
            $newContent += "  : 'http://localhost:5000/api'"
            $inApiBase = $true
        }
        elseif ($inApiBase -and ($line -match "^\s*\?" -or $line -match "^\s*:")) {
            # Skip the old ? and : lines
            continue
        }
        elseif ($inApiBase -and $line -match "^\s*$") {
            # End of API_BASE block
            $inApiBase = $false
            $newContent += $line
        }
        elseif (-not $inApiBase) {
            $newContent += $line
        }
    }
    
    # Write back to file
    $newContent | Set-Content -Path $file
    
    Write-Host "Updated: $file"
}

Write-Host "All route files have been updated to use localhost!"