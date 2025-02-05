<?php

namespace App\Services;

use GuzzleHttp\Client;
use App\Models\Article;
use Carbon\Carbon;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Log;



class NewsAPIService
{
    /**
     * guzzle client
     * @var \GuzzleHttp\Client
     */
    protected $client;
    protected $apiKey;

    /**
     * wait after api failure
     * @var int
     */
    protected $waitTime;

    /**
     * max nuumber of retries
     * @var int
     */
    protected $retries;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('NEWSAPI_API_KEY');
        $this->waitTime = 30;
        $this->retries = 20;
    }

    /**
     * fecth articles from third party (newsapi)
     */

    public function fetchArticles($date = null, $pageSize = 10)
    {
        $page = 1;
        $totalResults = 0;
        $articlesFetched = 0;
        $date = $date ?? now()->subDay()->format('Y-m-d');

        do {
            try {
                $response = $this->client->get('https://newsapi.org/v2/everything', [
                    'query' => [
                        'q' => '*',
                        'from' => $date,
                        'to' => $date,
                        'pageSize' => $pageSize,
                        'page' => $page,
                        'apiKey' => $this->apiKey,
                    ]
                ]);

                $data = json_decode($response->getBody(), true);

                $totalResults = $data['totalResults'];
                $articles = $data['articles'];

                $this->storeArticles($articles);

                $page++;
            } catch (ClientException $e) {
                $data = json_decode($e->getResponse()->getBody(), true);
                if ($data['code'] === "maximumResultsReached" && $this->retries) {
                    sleep($this->waitTime);
                    $this->retries -= 1;

                    Log::info("retring fetch page {$page} and retries left {$this->retries}");

                    continue;
                }

                throw $e;
            }
        } while ($articlesFetched < $totalResults);
    }

    /**
     *  update or insert articles in batches
     */

    protected function storeArticles($articles)
    {
        $batch = [];
        foreach ($articles as $article) {
            $batch[] = [
                'api_source' => 'newsapi',
                'source' => $article['source']['name'] ?? null,
                'author' => $article['author'] ?? null,
                'title' => $article['title'],
                'description' => $article['description'] ?? null,
                'content' => $article['content'] ?? null,
                'url' => $article['url'] ?? null,
                'url_to_image' => $article['urlToImage'] ?? null,
                'published_at' => Carbon::parse($article['publishedAt']) ?? now(),
                'raw_message' => json_encode($article),
            ];
        }

        Article::upsert($batch, ['url']);
    }
}
