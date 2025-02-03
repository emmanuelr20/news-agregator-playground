<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use \Illuminate\Http\JsonResponse;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResponse($result, $message, $code = 200): JsonResponse
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
            'statusCode' => $code
        ];
        return response()->json($response, $code);
    }
    /**
     * return error response.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError($errorMessages, $error = [], $code = 404): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $errorMessages,
            'statusCode' => $code
        ];
        if (!empty($error)) {
            $response['data'] = $error;
        }

        return response()->json($response, $code);
    }
}
