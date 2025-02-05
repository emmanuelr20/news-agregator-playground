<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

const MAX_PAGE = 20;

class ArticleController extends BaseController
{
    public function list(Request $request): JsonResponse
    {
        $articles = Article::query();

        if ($request->has('authors')) {
            $articles = $articles->whereIn('author', $request->authors);
        }

        if ($request->has('sources')) {
            $articles = $articles->whereIn('source', $request->sources);
        }

        $articles = $articles->paginate(MAX_PAGE);

        return $this->sendResponse($articles, 'Artiles List');
    }

    function get(string $id): JsonResponse
    {
        $article = Article::find($id);
        if ($article) {
            return $this->sendResponse(
                [
                    'article' => $article,
                ],
                'Authors found'
            );
        }

        return $this->sendError("Article Not found");
    }

    function authors(): JsonResponse
    {
        $authors = Article::whereNotNull('author')->distinct('author')->pluck('author');
        return $this->sendResponse(
            [
                'authors' => $authors,
                'count' => count($authors)
            ],
            'Authors List'
        );
    }

    function sources(): JsonResponse
    {
        $sources = Article::distinct('source')->pluck('source');
        return $this->sendResponse(
            [
                'sources' => $sources,
                'count' => count($sources)
            ],
            'Sources List'
        );
    }
}
