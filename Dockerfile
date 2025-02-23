# Базовый образ Python
FROM python:3.9-slim

# Установка системных зависимостей
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Рабочая директория
WORKDIR /app

# Копирование зависимостей
COPY requirements.txt .

# Установка Python-зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Копирование проекта и конфига Nginx
COPY . .
COPY nginx.conf /etc/nginx/sites-available/default

# Сборка статических файлов
RUN python manage.py collectstatic --noinput

# Порт для Django и Nginx
EXPOSE 8000 80

# Запуск Nginx и Gunicorn
CMD service nginx start && gunicorn --bind 0.0.0.0:8000 --workers 3 parking.wsgi
