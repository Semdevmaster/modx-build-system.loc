{extends 'file:templates/layout.tpl'}

{block 'content'}
  <header class="container outside-bg py-4 mb-4 bg-purple-700 flex flex-wrap justify-between items-center">
    <div class="text-2xl text-white">Logo</div>
    <div class="icon icon-call-sharp icon-margin-right-sm text-white">phone</div>
  </header>
  <main class="container">
    {include 'file:chunks/utils/_breadcrumbs.tpl'}
    <h1 class="header-right-side-line">Заголовок первого уровня</h1>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae culpa distinctio ducimus eum ex expedita,
      in libero natus officia officiis pariatur praesentium quam quas quos vero voluptatibus. Inventore, laboriosam.</p>
    <button class="btn bg-pink-700 text-white hover:bg-accent">Button</button>
  </main>
  <footer class="container outside-bg bg-gray-900 text-white py-6">
    <small class="block text-center">&copy; Company {''|date_format:'%Y'}</small>
  </footer>
{/block}
