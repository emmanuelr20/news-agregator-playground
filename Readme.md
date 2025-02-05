# to run

    ```docker-composer up --build```

# to get news

- use in the backend container
- run one of the following commmands for any of the news provider and provide a date (default to yesterday)

  ` php artisan app:fetch-newsapi-articles 2025-02-01`

  or

  `php artisan app:fetch-newsapi-articles`

  or using exec

  `docker-compose exec backend php artisan app:fetch-newsapi-articles`
