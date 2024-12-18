<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feature>
 */
class FeatureFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'image' => fake()->imageUrl(),
            'route_name' => fake()->unique()->slug(),
            'required_credits' => fake()->numberBetween(5, 50),
            'active' => true,
        ];
    }
}
