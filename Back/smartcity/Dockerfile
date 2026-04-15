FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD sh -c "python manage.py migrate && python manage.py createsuperuser --noinput --username senai --email admin@senai.com || true && python manage.py pop_locais || true && python manage.py pop_responsaveis || true && python manage.py pop_ambientes || true && python manage.py pop_sensores || true && python manage.py pop_historicos || true && python manage.py runserver 0.0.0.0:8000"