# Old (pip/venv) --> New (uv)

- python -m venv .venv --> uv venv (or implicit via uv init)
- source .venv/bin/activate --> uv run (no activation needed)
- pip install -r requirements.txt --> uv add --requirements requirements.txt
- pip freeze > requirements.txt --> uv export -o requirements.txt
- python manage.py migrate --> uv run python manage.py migrate