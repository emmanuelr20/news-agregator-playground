<?php

namespace App\Console\Commands;

use App\Services\NewsAPIService;
use Illuminate\Console\Command;

class FetchNewsAPIArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-newsapi-articles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch articles from NewsAPI and store them in the database';

    /**
     * The newapi service.
     *
     * @var \App\Services\NewsAPIService
     */

    protected $newsAPIService;

    public function __construct(NewsAPIService $newsAPIService)
    {
        parent::__construct();
        $this->newsAPIService = $newsAPIService;
    }
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Fetching articles...');
        $this->newsAPIService->fetchArticles();
        $this->info('Articles fetched and stored successfully.');
    }
}
