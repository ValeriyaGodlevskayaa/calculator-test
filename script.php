<?php
$bust = $_POST['bust'];
$waist = $_POST['waist'];
$hips = $_POST['hips'];

$sizes = [
    '8XL' => ['bust'=>146, 'waist' => 131, 'hips' => 154],
    '7XL' => ['bust'=>140, 'waist' => 124, 'hips' => 148],
    '6XL'=> ['bust'=>134, 'waist' => 117, 'hips' => 142],
    '5XL' => ['bust'=>128, 'waist' => 110, 'hips' => 135],
    '4XL' => ['bust'=>122, 'waist' => 103, 'hips' => 129],
    '3XL' => ['bust'=>116, 'waist' => 96, 'hips' => 123],
    '2XL' => ['bust'=>109, 'waist' => 90, 'hips' => 116],
    'XL' => ['bust'=>103, 'waist' => 83, 'hips' => 110],
    'L' => ['bust'=>98, 'waist' => 76, 'hips' => 104],
    'M' => ['bust'=>93, 'waist' => 72, 'hips' => 100],
    'S' => ['bust'=>89, 'waist' => 68, 'hips' => 96],
    'XS' => ['bust'=>85, 'waist' => 64, 'hips' => 92],
    'XXS' => ['bust'=>81, 'waist' => 60, 'hips' => 88],
    'XXXS'=> ['bust'=>77, 'waist' => 56, 'hips' => 84],

];
$ukSize= [
    '8XL' => 30,
    '7XL' => 28,
    '6XL'=> 26,
    '5XL' => 24,
    '4XL' => 22,
    '3XL' => 20,
    '2XL' => 18,
    'XL' => 16,
    'L' => 14,
    'M' => 12,
    'S' => 10,
    'XS' => 8,
    'XXS' => 6,
    'XXXS'=> 4,
];
$usaSize = [
    '8XL' => 28,
    '7XL' => 26,
    '6XL'=> 24,
    '5XL' => 22,
    '4XL' => 20,
    '3XL' => 18,
    '2XL' => 16,
    'XL' => 14,
    'L' => 12,
    'M' => 10,
    'S' => 8,
    'XS' => 6,
    'XXS' => 4,
    'XXXS'=> 2,
];


if (!isset($bust, $waist, $hips)) {
    return 'Error';
}

$maxSize = '8XL';

foreach ($sizes as $sizeName=>$sizeValues)
{
    if ( $bust > $sizeValues['bust'] || $waist > $sizeValues['waist'] || $hips > $sizeValues['hips']) {

       break;
    }
    $maxSize = $sizeName;
}


echo "<div id=\"divSizeCalculatorResult\" class=\"uk-form-row uk-margin-small-top\" style=\"\"><hr class=\"uk-article-divider uk-margin-remove\">
<p class=\"uk-text-large\" style='color: #85c958 !important;'>Your Size is: <strong style='color:#d85349;'>$maxSize</strong></p>
<p class=\"uk-text-large uk-margin-top\" style='color: #85c958 !important;'>Your UK Size is: <strong style='color:#d85349;'>$ukSize[$maxSize]</strong></p>
<p class=\"uk-text-large uk-margin-top\" style='color: #85c958 !important;'>Your USA Size is:  <strong style='color:#d85349;'>$usaSize[$maxSize]</strong></p></div>";