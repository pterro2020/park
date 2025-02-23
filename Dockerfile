# Базовый образ Python
FROM python:3.9-slim

# Установка системных зависимостей
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Рабочая директория
WORKDIR /app

# Копирование зависимостей
COPY requirements.txt .

# Установка Python-зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Копирование проекта
COPY . .

# Сборка статических файлов
RUN python manage.py collectstatic --noinput

# Порт для Django
EXPOSE 8000

# Команда для запуска через Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "parking.wsgi"]