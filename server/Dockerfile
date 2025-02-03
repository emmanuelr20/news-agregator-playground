# Use the official PHP-FPM image as the base image
FROM php:8.4-fpm

# Set the working directory inside the container
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libpq-dev 

# Install PHP extensions
RUN docker-php-ext-install \
    zip \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    intl \
    opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy only the composer.json and composer.lock files first
COPY composer.json composer.lock ./

# Install PHP dependencies (without optimizing autoloader)
RUN composer install --no-dev --no-autoloader --no-scripts

# Copy the rest of the application files
COPY . .

# Optimize the Composer autoloader
RUN composer dump-autoload --optimize

# Set permissions for Laravel storage and bootstrap cache
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Generate the Laravel application key
RUN php artisan key:generate

# Optimize Laravel for production
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Expose port 9000 (PHP-FPM default port)
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]