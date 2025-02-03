<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\User as ResourcesUser;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return $this->sendError(
                "Validation Error: {$validator->errors()->first()}",
                $validator->errors(),
                400
            );
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $token = $user->createToken('news-aggregator');
        $success['token'] =  $token->plainTextToken;
        $success['user'] =   ResourcesUser::make($user);

        return $this->sendResponse($success, 'User register successfully.');
    }
    /**
     * Login api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }


        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user =  User::firstWhere("id", Auth::id());
            $token = $user->createToken('news-aggregator');
            $success['token'] =  $token->plainTextToken;
            $success['user'] =  ResourcesUser::make($user);
            return $this->sendResponse($success, message: 'User login successfully.');
        } else {
            return $this->sendError('Inavlid credentials', ['error' => 'Inavlid credentials']);
        }
    }

    /**
     * get logged in user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(): JsonResponse
    {
        $user = Auth::user();
        return $this->sendResponse(ResourcesUser::make($user), 'User logged in.');
    }
}
