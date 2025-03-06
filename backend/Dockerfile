FROM python:3.12

# Install required system packages for WeasyPrint
RUN apt-get update && apt-get install -y \
    libgobject-2.0-0 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libffi-dev \
    libjpeg-dev \
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

# Run Django app
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
