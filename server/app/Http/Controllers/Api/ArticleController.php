<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

const MAX_PAGE = 20;

class ArticleController extends BaseController
{
    public function get(Request $request): JsonResponse
    {
        $articles = Article::query()->paginate(MAX_PAGE);
        return $this->sendResponse($articles, "Artiles List");
    }
}
