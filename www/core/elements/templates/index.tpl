{extends 'file:templates/layout.tpl'}

{block 'content'}
  <header class="container full-bleed-bg py-4 mb-4 bg-purple-700 flex flex-wrap justify-between items-center">
    <div class="text-2xl text-white">Logo</div>
    <div class="ui-icon icon-add before:mr-1 text-white">add</div>
  </header>
  <main class="container px-4">
    {include 'file:chunks/utils/_breadcrumbs.tpl'}
    <h1 class="side-line-right font-third">Заголовок первого уровня</h1>
    {if $_modx->user.id ===1}Administrator{/if}
    <p class="ordinal">1st</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae culpa distinctio ducimus eum ex expedita,
      in libero natus officia officiis pariatur praesentium quam quas quos vero voluptatibus. Inventore, laboriosam.</p>
    <div class="flex gap-4 mb-4">
      <div class="block px-4 py-4 bg-accent">Nice</div>
      <div class="block px-4 py-4 bg-accent">Nice</div>
      <div class="block px-4 py-4 bg-accent">Nice</div>
    </div>
    <button class="ui-btn bg-pink-700 text-white hover:bg-accent ripple">Button</button>
    <button class="ui-btn bg-orange-700 text-white hover:bg-accent ripple">Button</button>
    <button class="ui-btn bg-blue-700 text-white hover:bg-accent ripple">Button</button>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut consequuntur debitis dicta dolorum eos
      error explicabo facilis fuga, illo laboriosam quis saepe sed ullam. Expedita magni minima temporibus.</p>
    <label class="block mr-6 mb-10">
      <input type="checkbox" class="ui-checkbox-control text-gray-700 mr-2">
      <span>Checkbox</span>
    </label>
    <div class="container py-5 bg-primary text-white full-bleed-bg flex items-center">
      <label class="mr-6">
        <input type="checkbox" class="ui-checkbox-control text-white mr-2">
        <span>Checkbox</span>
      </label>
      <label class="ui-switch-control inline-flex items-center">
        <input type="checkbox" class="ui-switch-control-input">
        <span class="ui-switch-control-indicator mr-4"></span>
        <span class="ui-switch-control-description">Переключатель</span>
      </label>
    </div>
    <button id="cl" class="inline-block border border-red-500">
      <svg class="inline-icon text-3xl">
        <use xlink:href="assets/img/sprite.svg#menu-outline" class="menu-icon"></use>
        <use xlink:href="assets/img/sprite.svg#close-outline" class="close-icon hidden"></use>
      </svg>
    </button>
    <script>
      const cl = document.querySelector('#cl')
      const menuIcon = cl.querySelector('.menu-icon')
      const closeIcon = cl.querySelector('.close-icon')
      cl.addEventListener('click', () => {
        menuIcon.classList.toggle('hidden')
        closeIcon.classList.toggle('hidden')
      })
    </script>

    <h2>Animations</h2>
    <div class="grid grid-cols-12 items-center justify-items-center">
      <div>
        <div role="presentation" class="ui-loader-donut-spinner text-accent"></div>
      </div>
      <div>
        <div class="ui-loader-bouncing">
          <div></div>
        </div>
      </div>
    </div>


    <h2>Forms</h2>
    <hr>
    <div class="flex items-end">
      <div>
        <button class="ui-btn">Button</button>
      </div>
      <div>
        <label class="block mb-1">Change your country</label>
        <div class="ui-select">
          <select name="country" aria-label="choose you country">
            <option value="1">Russia</option>
            <option value="2">Germany</option>
            <option value="3">USA</option>
            <option value="4">UK</option>
          </select>
        </div>
      </div>
    </div>
  </main>
  <footer class="container full-bleed-bg bg-gray-900 text-white py-6">
    <small class="block text-center">&copy; Company {''|date_format:'%Y'}</small>
  </footer>
{/block}
