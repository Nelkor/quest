<?php

function up($n, $pos)
{
    $size = $n * $n;
    $step = $pos - $n;

    return $step < 0 ? $step + $size : $step;
}

function left($n, $pos)
{
    return $pos-- % $n ? $pos : $pos + $n;
}

function down($n, $pos)
{
    $size = $n * $n;
    $step = $pos + $n;

    return $size > $step ? $step : $step - $size;
}

function right($n, $pos)
{
    return ++$pos % $n ? $pos : $pos - $n;
}

$method = filter_input(INPUT_GET, 'method', FILTER_SANITIZE_STRING);
$n = filter_input(INPUT_GET, 'n', FILTER_VALIDATE_INT);
$pos = filter_input(INPUT_GET, 'pos', FILTER_VALIDATE_INT);

if ( ! function_exists($method)) exit;

echo call_user_func($method, $n, $pos);
