# Templateman

Simple and flexible code generating tool for frequently used components.

## Concepts
Templateman is designed to facilitate creation a large number of repeating code components
and make you free from this drudgery.

It provides the ability to generate new files, directories 
and file structures based on code templates, regardless of the file type or programming language.
Templateman also allows you to define special variables
to which you can set values when a new template instance is created.

Templateman includes 2 main concepts:
- **Code templates:** files with `.tm` extension which is used as a templates 
and can contain special Templateman variables in the form of `${TM:VARIABLE_NAME}`.
- **Templateman config:** describes and combines all your code templates, which you will use, including their names, location and output path. 
Templateman finds and loads a configuration object from (using amazing [cosmiconfig](https://www.npmjs.com/package/cosmiconfig)):
   - a `templateman.config.js` CommonJS module
   - a JSON or YAML `.templatemanrc` file
   - a `templateman` property in `package.json`

## Install
```console
$ npm install templateman -g
```
or if you use Yarn
```console
$ yarn global add templateman
```


## Usage and examples

**Templateman Hello world**

1\. Firstly we should create a code template file.

*./templates/hello-world.js.tm:*
```
console.log('${TM:HELLO_MESSAGE}');
```
Here `${TM:HELLO_MESSAGE}` is a special syntax of Templateman variables in the form of `${TM:VARIABLE_NAME}`.
`VARIABLE_NAME` may contain only latin characters in uppercase, digits and underscore symbol.

2\. Then let's create templateman.config.js file.

*./templateman.config.js:*
```js
module.exports = {
	templates: [
        {
            name: 'Hello world template',
            files: {
                from: './templates/hello-world.js.tm',
                to: './output/${TM:HELLO_FILENAME}.js',
            },
        },
	]
}
```


3\. Now just type 'tm' in your console:

```console
$ tm
```

As you can see 'Hello world template' has appeared in the templates list.
After selecting it Templateman will walk through all the files in config and look for variables there.

Then when you have set variable values they will be replaced and new template contents will emit into output file
specified in `to` field.

*./output/hello.js:*
```js
console.log('Hello, Templateman!');
```

**Complex React-component**

Now let's complicate the task and implement complex React-component template for example.

Your project can have a very large number of these components and their permanent re-creation causes a severe headache for the developer.
So we need to set up Templateman to do this routine work for us.

1\. First extend templateman.config.js.

*./templateman.config.js:*
```js
module.exports = {
	templates: [
        {
            name: 'Hello world template',
            files: {
                from: './templates/hello-world.js.tm',
                to: './output/${TM:HELLO_FILENAME}.js',
            },
        },
        {
            name: 'Complex React component',
            files: [
                {
                    from: './templates/react-component.js.tm',
                    to: './output/components/${TM:COMPONENT_NAME}/${TM:COMPONENT_NAME}.js',
                },
                {
                    from: './templates/stylus-file.styl.tm',
                    to: './output/components/${TM:COMPONENT_NAME}/style.styl',
                },
                {
                    from: './templates/export-file.js.tm',
                    to: './output/components/${TM:COMPONENT_NAME}/index.js',
                },
            ],
        },
	]
}
```

2\. And add required .tm files.

*./templates/react-component.js.tm:*
```
// Vendor
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Styles
import style from './style.styl';

const ${TM:COMPONENT_NAME} = ({ className }) => (
  <${TM:COMPONENT_TAG} className={cn(style.${TM:COMPONENT_NAME}, className)}>
    ${TM:COMPONENT_CONTENT}
  </${TM:COMPONENT_TAG}>
);

${TM:COMPONENT_NAME}.defaultProps = {
  className: '',
};

${TM:COMPONENT_NAME}.propTypes = {
  className: PropTypes.string,
};

export default ${TM:COMPONENT_NAME};
```

*./templates/stylus-file.styl.tm:*
```
.${TM:COMPONENT_NAME} {
  & {}
}
```

*./templates/export-file.js.tm:*
```
export { default } from './${TM:COMPONENT_NAME}';
```

In the end we have:

*./output/components/Article.js:*

```js
// Vendor
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Styles
import style from './style.styl';

const Article = ({ className }) => (
  <article className={cn(style.Article, className)}>
    Article content
  </article>
);

Article.defaultProps = {
  className: '',
};

Article.propTypes = {
  className: PropTypes.string,
};

export default Article;
```

*./output/components/style.styl:*

```stylus
.Article {
  & {}
}
```

*./output/components/index.js:*
```js
export { default } from './Article';
```

That is how Templateman magic works.

## Maintainers
- [Igor Sebelev](https://github.com/adlite)

## License
Apache 2.0