<?php

/**
 * Specify the value "test" in the "middlewares_listeners" system setting.
 */
class RegStylesAndScriptsListener extends Middlewares\Listener
{
//    public $contexts = ['web', 'mgr'];

  public function OnWebPageInit()
  {
    $manifest = $this->modx->getOption('assets_path') . 'assets.json';
    if (file_exists($manifest)) {
      $files = json_decode(file_get_contents($manifest), true);
      foreach ($files as $file) {
        if (strpos($file, '.css')) {
          pls(['main_css_path' => 'assets/css/' . $file]);
        } elseif (strpos($file, '.js')) {
          pls(['main_js_path' => 'assets/js/' . $file]);
        }
      }
    }
  }
}

return 'RegStylesAndScriptsListener';
