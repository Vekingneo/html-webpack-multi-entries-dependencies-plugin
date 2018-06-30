'use strict';


class HtmlWebpackMultiEntriesDependenciesPlugin {
	constructor(options){

	}

	 apply(compiler) {
	    compiler.hooks.emit.tap('HtmlWebpackMultiEntriesDependenciesPlugin', (compilation) => {
	    	//only extract used webpack config
	      const chunkOnlyConfig = {
	      	entrypoints:true,
	        assets: false,
	        cached: false,
	        children: false,
	        chunks: true,
	        chunkModules: false,
	        chunkOrigins: false,
	        errorDetails: false,
	        hash: false,
	        modules: false,
	        reasons: false,
	        source: false,
	        timings: false,
	        version: false
	      };

	      const allChunks = compilation.getStats().toJson(chunkOnlyConfig).chunks;

		  compilation.hooks.htmlWebpackPluginAlterChunks.tap('getHtmlWebpackPluginChunks',(chunks, { plugin: htmlWebpackObj })=>{
	      	let explicitChunkNames = []
			
			//get the set entry from html-webpack-plugin config
	      	let includeChunks = htmlWebpackObj.options.chunks;
	      	if(typeof includeChunks !=='string' && includeChunks.length == 1){
				includeChunks = includeChunks[0]
			}
			//search depdencies for the set entry
			for (let [key, value] of compilation.entrypoints.entries()) {
				  if(key === includeChunks){
					  value.chunks.forEach((item,index)=>{
					  	explicitChunkNames.push(item.name)

					  })
				  }

			}

	      	// filtering explicit entry dependencies, leave only dependent chunks to include
	      	let explicitChunks = htmlWebpackObj.filterChunks(allChunks, explicitChunkNames, htmlWebpackObj.options.excludeChunks);
	      	// re-Sort chunks
      		explicitChunks = htmlWebpackObj.sortChunks(explicitChunks, htmlWebpackObj.options.chunksSortMode, compilation);

	      	return explicitChunks
		  })
	    });
	 }
}

module.exports = HtmlWebpackMultiEntriesDependenciesPlugin