<!doctype html>
<html lang="{$_modx->config.cultureKey}">
<head>
  <meta charset="UTF-8">
  {block 'title'}
    <title>{$_modx->resource.longtitle ?: $_modx->resource.pagetitle} | {$_modx->config.site_name}</title>
  {/block}
  <meta content="{$_modx->resource.description|strip:true|escape}" name="description">
  <base href="{$_modx->config.site_url}">
  <link as="style" href="{$_modx->getPlaceholder('main_css_path')}" rel="preload">
  <link as="font" crossorigin="anonymous" href="assets/fonts/Roboto-Regular.woff2" rel="preload" type="font/woff2">
  <link as="font" crossorigin="anonymous" href="assets/fonts/Roboto-Bold.woff2" rel="preload" type="font/woff2">
  <link rel="preload" as="image" href="assets/img/sprite.svg">
  <link rel="canonical" href="{$_modx->makeUrl($_modx->resource.id, '', '', 'full')}">
  <meta content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover" name="viewport">
  <meta content="ie=edge" http-equiv="X-UA-Compatible">
  <meta name="format-detection" content="telephone=no,address=no,date=no,email=no">
  <meta name="robots" content="[[+seoTab.robotsTag]]">
  <meta name="msapplication-TileColor" content="#ffc40d">
  <meta name="theme-color" content="#ffffff">
  {block 'add_meta'}{/block}
  <link rel="icon" type="image/x-icon" href="assets/img/favicons/favicon.ico">
  <link rel="shortcut icon" href="assets/img/favicons/favicon.ico">
  <link rel="icon" type="image/png" href="assets/img/favicons/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="assets/img/favicons/favicon-48x48.png" sizes="194x194">
  <link rel="icon" type="image/png" href="assets/img/favicons/favicon-16x16.png" sizes="16x16">
  <link href="{$_modx->getPlaceholder('main_css_path')}" rel="stylesheet">
  {block 'add_css'}{/block}
  <script defer src="{$_modx->getPlaceholder('main_js_path')}"></script>
{*  <script defer src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>*}
  {block 'add_js'}{/block}
</head>
<body>
{block 'content'}{/block}
</body>
</html>
