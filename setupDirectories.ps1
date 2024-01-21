$directories = @(
    ".\src\config",
    ".\src\controllers",
    ".\src\models",
    ".\src\routes",
    ".\views"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path $dir
}
