# Gulp with TailwindCSS Starter Template

![The starting page of the template](/img.jpg)

## Features

- Easy configuration using `config.js`
- Live reload on file/assets changes using `browser-sync`
- SCSS support
- Minification of styles and scripts on production build
- Image conversion into Webp Format and automatic creation of Picture Tag in the assembly `gulp-webp`
- Includes following tailwindcss plugins (can be disabled/enabled with `config.js`)
- Automatic shooting of fonts from .ttf .woff and .woff2, automatically creating a fonts.scss file and font connecting.
- Other libraries included in the template "Swiper, LightGallery, ..." (to use them you need to uncomment the required functionality in the App.js file)
- Other scripts (to use them, you need to enable the necessary import in the App.js file)


## Quick Start

You can get started by clicking on `Use this template` for creating new repo using this template or simply by cloning it.

Install dev dependencies

```sh
yarn add // or // npm install
```

Start development server with live preview

```sh
yarn dev // or // npm run dev
```

Start development server and PHP server with live preview

```sh
yarn php // or // npm run php
```

Generate build files for production server

```sh
yarn dev // or // npm run dev (No Webp)
```

Build a project without converting images (optimization only)

```sh
yarn build // or // npm run build (No Webp)
```

Build a project with image conversion and optimization

```sh
yarn webp // or // npm run webp (Webp)
```

All dev files are present in `src` folder. The build version can be found in `build` folder after running `yarn build` command.

## Configuration

All configurations are found in `config.js` file in the root directory. You can configure browser default port, enable/disable plugins by simply updating boolean values (Default is set to `true`) and many more.

```js
export const mainParams = {
  IS_LOG: true,
  IS_TAILWIND: true,
  WEBP_COMPRESS: 80,
  JPEG_COMPRESS: 80,
  PNG_COMPRESS: [0.7, 0.7],
}

// tailwind plugins
// set to false to disable
const plugins = {
  typography: true,
  forms: true,
  containerQueries: true,
};
...
```
#

# Documentation on work with a template

### Use already connected to the libraries template those other functionality:

#### Install dev dependencies

```sh
yarn add // or // npm install
```

Start development server with live preview

```sh
yarn dev // or // npm run dev
```

#### Generate build files for production server

```sh
yarn dev // or // npm run dev (No Webp)
```

Build a project without converting images (optimization only)

```sh
yarn build // or // npm run build (No Webp)
```

Build a project with image conversion and optimization

```sh
yarn webp // or // npm run webp (Webp)
```

#### ALIASES:

For adding the "src" attribute to HTML image tags and for the "url" of images in SCSS, the shortcut "@img/" is used. This helps to easily specify the path without depending on the nesting level "../../../img/".

### JS:

In the "js" directory, in the file "app.js," there are commented imports of installed libraries and various helper functions, each accompanied by a brief description of their purpose and a link to the documentation. To enable the functionality, you need to uncomment the necessary import. Inside the imported file, you will find a more detailed description and starter code with configurations.

In the file "functions.js," various helper functions are located, which are exported for use. To use a specific function, you need to export it to the *.js file where you want to use it:

- Or at once all:
```js
import * as TF from "../functions/functions.js"
```
- Or only specific:
```js
import { getRandomNumber, logger } from "../functions/functions.js"
```

### SCSS:


In the main file "style.scss," there are imports of auxiliary files. Among them are imports:
```scss
@import "params/tailwind";
@import "params/custom";
``` 
If you plan to use Tailwind CSS, uncomment it and comment out 'custom'. If you plan to write custom styles, do the opposite.

In the file "@import "params/custom";," there are settings necessary for the mixins to work (mixins "mixins.scss" are included in the middle of "custom.scss" along with the file resetting default styles "null.scss").

During the build process, fonts are located in the "fonts" directory, they are converted to woff and woff2, and a file "fonts.scss" is automatically created, which is also imported into "style.scss."

### СOMPONENTS:

The template utilizes the "gulp-file-include" plugin, which allows for including template files (components) into other HTML files. There is a separate directory created for components, where you can organize the necessary structure (the initial structure includes directories for individual blocks, elements, and global components).

Official Detailed Plugin Document by Reference
[Github: gulp-file-include](https://github.com/haoxins/gulp-file-include)

To create a component, you need to create a component directory.

#### An example of components of square:

```sh
|--|src/
|-----|components/
|---------| header/
|-------------| _header.html
|-------------| header.scss
|-------------| header.json
|---------| footer/
|-------------| _footer.html
|-------------| footer.scss
|-------------| footer.json
``` 

The style files created in the component directory are automatically included and do not require manual importing.

In the JSON file, you can store content for the component as needed (there can be multiple JSON files for displaying different content in different inclusion points). An example of using JSON will be provided later!

#### Use of the component:

_The path to the component always begins with the root of the project "src/components/"_

- Example of simple connection "_user-card.htm" with transmission of parameters as an object (parameters to use not required):
```html
@@include('src/components/global/_user-card.htm', { 
      "name": 'User name', 
      "age": '30', 
      "profession": 'Developer', 
      "photo": {
         url: '@img/users/user.jpg',
         title: 'Alt text'
      }, 
   })
```
File content "_user-card.htm":
```html
<div class="user-card">
   <img src="@@photo.url" alt="@@photo.title" class="user-card__photo">
   <h2 class="user-card__name">@@name</h2>
   <span class="user-card__age">@@age</span>
   <p class="user-card__profession">@@profession</p>
</div>
```

- Example of connection "_user-card.htm" in the "For" cycle:
```html
@@for (var i = 0; i < 5; i++) {
  @@include('src/components/global/_user-card.htm', { 
      "name": 'User name', 
      "age": '30', 
      "profession": 'Developer', 
      "photo": '@img/users/user.jpg', 
   })
}
```

- Example of connection "_user-card.htm" in the cycle "Loop":
```html
@@loop('src/components/global/_user-card.htm', [
    { "name": "User name 1", "age": "20", "profession": 'Developer', "photo": '@img/users/user1.jpg' },
    { "name": "User name 2", "age": "30", "profession": 'Engineer', "photo": '@img/users/user2.jpg' },
    { "name": "User name 3", "age": "40", "profession": 'Designer', "photo": '@img/users/user3.jpg' }
  ])
```

- Example of Connection "user-card.html" with the .json file ":
```html
@@loop("src/components/global/_user-card.htm", "user-card.json")
```
File content "user-card.json":
```json
[
   { "name": "User name 1", "age": "20", "profession": "Developer", "photo": "@img/users/user1.jpg" },
   { "name": "User name 2", "age": "30", "profession": "Engineer", "photo": "@img/users/user2.jpg" },
   { "name": "User name 3", "age": "40", "profession": "Designer", "photo": "@img/users/user3.jpg" }
]
```

## License

This project is open source and available under the [MIT License](LICENSE).
