<!doctype html>
<html lang="{$_modx->config.cultureKey}">
<head>
  <meta charset="UTF-8">
  {block 'title'}
    <title>{$_modx->resource.longtitle ?: $_modx->resource.pagetitle} | {$_modx->config.site_name}</title>
  {/block}
  <meta content="{$_modx->resource.description|strip:true|escape}" name="description">
  <base href="{$_modx->config.site_url}">
  <link rel="canonical" href="{$_modx->makeUrl($_modx->resource.id, '', '', 'full')}">
  {if $_modx->getPlaceholder('dev_css_path') && $_modx->user.id === 1}
    <link as="style" href="{$_modx->getPlaceholder('dev_css_path')}" rel="preload">
  {else}
    <link as="style" href="{$_modx->getPlaceholder('main_css_path')}" rel="preload">
  {/if}
  <link as="font" crossorigin="anonymous" href="assets/fonts/Roboto-Regular.woff2" rel="preload" type="font/woff2">
  <link as="font" crossorigin="anonymous" href="assets/fonts/Roboto-Bold.woff2" rel="preload" type="font/woff2">
  <meta content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover" name="viewport">
  <meta content="ie=edge" http-equiv="X-UA-Compatible">
  <meta name="format-detection" content="telephone=no,address=no,date=no,email=no">
  <meta name="robots" content="[[+seoTab.robotsTag]]">
  <meta name="theme-color" content="#ffffff">
  {block 'add_meta'}{/block}

  <link rel="icon" href="assets/img/favicons/favicon.svg">
  <link rel="mask-icon" href="assets/img/favicons/favicon.svg" color="#000000">
  <link rel="apple-touch-icon" href="assets/img/favicons/apple-touch-icon.png">{*180x180*}
  <link rel="manifest" href="manifest.json">

  {if $_modx->getPlaceholder('dev_css_path') && $_modx->user.id === 1}
    <link href="{$_modx->getPlaceholder('dev_css_path')}" rel="stylesheet">
  {else}
    <link href="{$_modx->getPlaceholder('main_css_path')}" rel="stylesheet">
  {/if}

  {block 'add_css'}{/block}

  {if $_modx->getPlaceholder('dev_js_path') && $_modx->user.id === 1}
    <script defer src="{$_modx->getPlaceholder('dev_js_path')}"></script>
  {else}
    <script defer src="{$_modx->getPlaceholder('main_js_path')}"></script>
  {/if}
  {*  <script defer src="//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>*}
  {block 'add_js'}{/block}
</head>
<body>
{block 'content'}{/block}
</body>
</html>
