# html-webpack-multi-entries-dependencies-plugin

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin). 
Make sure you have html-webpack-plugin used otherwise you won't need to use this, and only supports webpack 4 currently.

This plugin helps to extract entry dependencies and inject them into desired html files.

It is helpful while having multiple entries and each entry refers to respective html file. While in this case, standard webapck and ```html-webpacl-plugin``` build will inject all enties and chunks into every html file. Or you can use the
``` chunks ``` or ``` excludeChunks ``` options of html-webpack-plugin to add or remove some chunks, but this solution is not wise and precise as long as you have to configure the options mannually.

By adding this plugin it could auto inject entry and its dependencies into descired html file.

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
and ```html-webpack-plugin``` configured as:
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
      filename: 'workbench.html',
      template: './src/html/profile.html',
      chunks: ['profile'], //instead of define chunks to include, define your entry here
      inject:true
    }),
```
by adding this plugin the option ```chunks``` of ```html-webpack-plugin``` is no lonnger defines the chunks to include but the entry and entry dependencies to include.

For instance: after webpack build this plugin will make ```html-webpacl-plugin``` only extracts dependencies of ```business.js``` and inject into ```business.html``` with out redundant chunks (and also on workbench and profile entries). In this case, it will generates ```business.html``` looks like:

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
 



