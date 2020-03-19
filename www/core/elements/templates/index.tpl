{extends 'file:templates/layout.tpl'}

{block 'content'}
  <header class="container full-bleed-bg py-4 mb-4 bg-purple-700 flex flex-wrap justify-between items-center">
    <div class="text-2xl text-white">Logo</div>
    <div class="icon icon-add icon-margin-right-sm text-white">phone</div>
  </header>
  <main class="container">
    {include 'file:chunks/utils/_breadcrumbs.tpl'}
    <h1 class="header-right-side-line">Заголовок первого уровня</h1>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae culpa distinctio ducimus eum ex expedita,
      in libero natus officia officiis pariatur praesentium quam quas quos vero voluptatibus. Inventore, laboriosam.</p>
    <button class="btn bg-pink-700 text-white hover:bg-accent ripple">Button</button>
    <button class="btn bg-orange-700 text-white hover:bg-accent ripple">Button</button>
    <button class="btn bg-blue-700 text-white hover:bg-accent ripple">Button</button>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut consequuntur debitis dicta dolorum eos
      error explicabo facilis fuga, illo laboriosam quis saepe sed ullam. Expedita magni minima temporibus.</p>
    <div class="py-5 bg-primary text-white full-bleed">Hello</div>
  </main>
  <footer class="container full-bleed-bg bg-gray-900 text-white py-6">
    <small class="block text-center">&copy; Company {''|date_format:'%Y'}</small>
  </footer>
{/block}
