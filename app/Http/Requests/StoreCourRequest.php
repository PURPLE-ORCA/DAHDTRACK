<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|unique:cours",
            "label" => "required|unique:cours",
            "color" => "required|unique:cours",
            'formation_ids' => ['nullable', 'array'],
            'formation_ids.*' => ['exists:formations,id'],
        ];
    }
}
