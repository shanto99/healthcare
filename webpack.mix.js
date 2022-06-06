const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

 mix.ts("resources/js/app.tsx", "public/js/app.js")
   .styles([
         'resources/css/all.css',
      ], 'public/css/all.css')
   .react()
   .sass('resources/sass/app.scss', 'public/css/app.css');
