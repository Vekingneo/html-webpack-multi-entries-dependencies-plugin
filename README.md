# html-webpack-multi-entries-dependencies-plugin

[![npm](https://img.shields.io/npm/dw/html-webpack-multi-entries-dependencies-plugin.svg)](https://www.npmjs.com/package/html-webpack-multi-entries-dependencies-plugin)

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin). 
Make sure you have ```html-webpack-plugin``` used otherwise you won't need to use this, and only supports webpack 4 currently.

This plugin helps to extract dependencies of each entry file and inject them and their dependencies into aimed html files.It is particularly helpful while having multiple entries and each entry refers to respective html file. 

While having mutilple entries, standard solution of webapck and ```html-webpacl-plugin``` build and inject all enties and chunks into every html file. Or you can use the
``` chunks ``` or ``` excludeChunks ``` option attributes of html-webpack-plugin to add or remove chunks, but solution are not precise as long as you have to configure the dependencies mannually.

By adding this plugin play with ```html-webpack-plugin```, the building progress could automatically inject entry and its dependencies into aimed html file/files.

Installation
------------
You must be running webpack 4 and html-webpack-plugin used

Install the plugin with npm:
```shell
npm install --save-dev  html-webpack-multi-entries-dependencies-plugin
```

How to Use
------------
Load the plugin:

```javescript
const htmlWebpackMultiEntriesDepsPlugin = require('html-webpack-multi-entries-dependencies-plugin')
```


and add it to your webpack config as follows:
```javascript
plugins: [
  new htmlWebpackMultiEntriesDepsPlugin()
]  
```

assume you have webpack entry configured as:
```javascript
	entry:{
	    business:'./src/business.js',
            workbench:'./src/workbench.js',
            profile:'./src/profile.js'
	}
```
and ```html-webpack-plugin``` are configured as:
```javascript
    new HtmlWebpackPlugin({
      filename: 'business.html',
      template: './src/html/business.html',
      chunks: ['business'], //instead of define chunks to include, define your entry here
      inject:true
    }),
    new HtmlWebpackPlugin({
      filename: 'workbench.html',
      template: './src/html/workbench.html',
      chunks: ['workbench'], //instead of define chunks to include, define your entry here
      inject:true
    }),
    new HtmlWebpackPlugin({
      filename: 'profile.html',
      template: './src/html/profile.html',
      chunks: ['profile'], //instead of define chunks to include, define your entry here
      inject:true
    }),
```
by implementing this plugin, the option ```chunks``` of ```html-webpack-plugin``` is no lonnger defines the chunks to include, but the entry and its dependencies to include.

For instance: in the example above, during the webpack complilation, the ```html-webpacl-plugin``` will only extracts dependencies of ```business.js``` and inject them into ```business.html``` with out redundant chunks (works the same on workbench and profile entries). In this case, it will generates ```business.html``` looks like:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>BUSINESS PAGE</title>
</head>
<body>
<!-- built files will be auto injected -->
<script type="text/javascript" src="./js/vendors~business.js">
</script><script type="text/javascript" src="./js/business.js"></script></body>
</html>
```
 



