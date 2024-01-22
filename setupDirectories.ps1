$directories = @(
    ".\src\config",
    ".\src\controllers",
    ".\src\models",
    ".\src\routes",
    ".\src\middlewares",
    ".\src\services",
    ".\views"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path $dir
}
