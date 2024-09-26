# Use an official Python runtime as a base image
FROM python:3.12.2 

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    cargo \
    libjpeg-dev \       
    zlib1g-dev          

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies directly without creating a virtual environment
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port 8000 to the outside world
EXPOSE 8000

# Run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "startupPacking.wsgi:application"]
