const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '../../node_modules/flowbite/**/*.js'),
    join(__dirname, '../../node_modules/flowbite-datepicker/dist/js/datepicker.min.js'),
    join(__dirname, '../../libs/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [require('flowbite/plugin')],
};
