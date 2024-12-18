<?php

use App\Models\Feature;
use App\Models\User;
use App\Models\UsedFeature;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(classAndTraits: RefreshDatabase::class);
beforeEach(function () {
    $this->feature = Feature::factory()->create([
        'route_name' => 'feature1.index',
        'active' => true,
        'required_credits' => 10
    ]);

    $this->user = User::factory()->create([
        'available_credits' => 100
    ]);
});

test('index page can be rendered', function () {
    $response = $this->actingAs($this->user)
        ->get(route('feature1.index'));

    $response->assertInertia(
        fn($page) => $page
            ->component('Feature1/Index')
            ->has('feature')
            ->where('answer', null)
    );
});

test('index page shows previous answer from session', function () {
    $response = $this->actingAs($this->user)
        ->withSession(['answer' => 42])
        ->get(route('feature1.index'));

    $response->assertInertia(
        fn($page) => $page
            ->component('Feature1/Index')
            ->where('answer', 42)
    );
});

test('calculation works correctly and stores usage', function () {
    $response = $this->actingAs($this->user)
        ->post(route('feature1.calculate'), [
            'number1' => 5,
            'number2' => 3
        ]);

    $response->assertRedirect(route('feature1.index'))
        ->assertSessionHas('answer', 8);


    echo $this->user->available_credits;
    // Check if credits were decreased
    $this->user->refresh();
    expect($this->user->available_credits)->toBe(90);

    // Check if usage was recorded
    $usedFeature = UsedFeature::latest()->first();
    expect($usedFeature)->not->toBeNull()
        ->and($usedFeature->feature_id)->toBe($this->feature->id)
        ->and($usedFeature->user_id)->toBe($this->user->id)
        ->and($usedFeature->credits)->toBe(1)
        ->and($usedFeature->data)->toBe([
            'number1' => '5',
            'number2' => '3',
            'result' => 8
        ]);
});

test('calculation fails with insufficient credits', function () {
    $user = User::factory()->create([
        'available_credits' => 5
    ]);

    $response = $this->actingAs($user)
        ->post(route('feature1.calculate'), [
            'number1' => 5,
            'number2' => 3
        ]);

    $response->assertRedirect();

    // Check no credits were deducted
    $user->refresh();
    expect($user->available_credits)->toBe(5);

    // Check no usage was recorded
    expect(UsedFeature::count())->toBe(0);
});

test('calculation requires numeric values', function () {
    $response = $this->actingAs($this->user)
        ->post(route('feature1.calculate'), [
            'number1' => 'not-a-number',
            'number2' => 3
        ]);

    $response->assertInvalid(['number1']);

    // Check no credits were deducted
    $this->user->refresh();
    expect($this->user->available_credits)->toBe(100);

    // Check no usage was recorded
    expect(UsedFeature::count())->toBe(0);
});
