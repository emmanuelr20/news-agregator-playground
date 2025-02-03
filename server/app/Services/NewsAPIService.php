<?php

namespace App\Services;

use GuzzleHttp\Client;
use App\Models\Article;
use Illuminate\Support\Facades\Log;

class NewsAPIService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('NEWSAPI_API_KEY');
    }

    public function fetchArticles($query = 'laravel', $pageSize = 100): void
    {
        $url = "https://newsapi.org/v2/everything?q={$query}&pageSize={$pageSize}&apiKey={$this->apiKey}";

        try {
            $response = $this->client->get($url);
            $data = json_decode($response->getBody(), true);

            if (isset($data['articles'])) {
                $this->storeArticles($data['articles']);
            }
        } catch (\Exception $e) {
            Log::error('Error fetching articles: ' . $e->getMessage());
        }
    }

    protected function storeArticles($articles)
    {
        $batch = [];
        foreach ($articles as $article) {
            $batch[] = [
                'source' => $article['source']['name'] ?? null,
                'author' => $article['author'] ?? null,
                'title' => $article['title'],
                'description' => $article['description'] ?? null,
                'content' => $article['content'] ?? null,
                'url' => $article['url'] ?? null,
                'url_to_image' => $article['urlToImage'] ?? null,
                'published_at' => $article['publishedAt'] ?? null,
                'raw_message' => json_encode($article),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert in batches
        Article::insert($batch);
    }
}
