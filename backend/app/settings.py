from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_DIR = BASE_DIR / "static"

REPORTS_DIR = BASE_DIR / "data" / "reports"
REPORTS_DIR.mkdir(parents=True, exist_ok=True)

REPORTS_URL = "http://127.0.0.1:8000/reports"

TEMPLATES_DIR = BASE_DIR / "templates"