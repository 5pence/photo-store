# Use official Python image
FROM python:3.12

# Install system dependencies required by WeasyPrint
RUN apt-get update && apt-get install -y \
    libgdk-pixbuf2.0-0 \
    libpangocairo-1.0-0 \
    libcairo2 \
    libpangoft2-1.0-0 \
    libjpeg62-turbo \
    libffi-dev \
    libxml2 \
    libxml2-dev \
    libxslt1-dev \
    libssl-dev \
    zlib1g-dev \
    fonts-liberation \
    libharfbuzz-bin \
    libharfbuzz0b \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port 8000 (default Django port)
EXPOSE 8000

# Run Django application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
