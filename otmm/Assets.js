import querystring from 'querystring';
import OTMMAPI from './OTMMAPI.js';
	
export default class Assets extends OTMMAPI {


	/**
	* java.lang.IllegalArgumentException: Invalid character found in the request target 
	*	[/otmmapi/v6/assets?load_type=system&level_of_detail=slim&selection_context=%7B%22selection_context_param%22:%7B%22selection_context%22:%7B%22child_type%22:%22ASSETS%22,%22include_descendants%22:%22NONE%22,%22type%22:%22com.artesia.asset.selection.AssetIdsSelectionContext%22,%22include_devared_assets%22:false,%22asset_ids%22:[%22411811a6608665e00d3bac8671e67cad043fd40a%22]%7D%7D%7D ]. 
	* The valid characters are defined in RFC 7230 and RFC 3986
	* 
	* https://stackoverflow.com/questions/54287922/the-valid-characters-are-defined-in-rfc-7230-and-rfc-3986
	* If you use an upper version of Tomcat 8.5 it throws this exception if the URL path contains '[' and ']'. For older versions, it works.
	*/

	static async getQueryString(parameters){
		var qs = '';
		var value = null;
		
		for (const param of Object.keys(parameters)) {		
			value = parameters[param];
			
			if (typeof value === 'object' || Array.isArray(value)){
				value = await encodeURIComponent(Assets.stringify(parameters[param])) ;
				qs += param + "=" + value + "&";
			}
			else{
				qs += param + "=" + parameters[param] + "&";
			}							
		}
	
		return qs;
	}		
	
	/**
	* @see Creating your own simplified implementation of JSON.stringify() 
	* https://levelup.gitconnected.com/creating-your-own-simplified-implementation-of-json-stringify-ed8e50b9144a
	*/
	static stringify(value) {
		const lastKey = Object.keys(value).pop();
		let objString = '';
		
		if (Array.isArray(value)){
			let size = value.length;
			let beforeLast = size - 1;
			
			// We add the first square brace
			objString += '[';
			for(var i=0; i< size; i++){
				objString += `${Assets.stringify(value[i]).trim()}`;
				
				// We add the comma
				if(i != beforeLast){
					objString += ",";
				}
			}
			// We add the last square brace
			objString += ']';
			console.debug("--------" + objString);
		}
		else if (typeof value === 'object') {
			// We add the first curly brace
			objString += '{';
			for (const key in value) {
				objString += `"${key}":${Assets.stringify(value[key])}`;
				
				// We add the comma
				if (key !== lastKey) {
					objString += ',';
				}
			}
			// We add the last curly brace
			objString += '}';
		} 
		else if (typeof value === 'string') {
			objString += `"${value}"`;
		} 
		else if (typeof value === 'number' || typeof value === 'boolean'){
			objString += `${value}`;
		}
		
		return objString;
	}
	
	/**
	 * Retrieve assets based on the provided selection context.
	 * <ul>
	 * 	<li>Method: GET</li>
	 * 	<li>API method: /v6/assets</li>
	 * 	<li>URL example: https://developer.opentext.com/otmmapi/v6/assets</li>
	 * </ul>	
	 * @param session - OTMM session object
	 * @param assetIds - Array of asset identifiers or a single asset identifier (string)
	 */
	static async retrieveAssets(session, assetIds){	
		try {		
			var link = this.urlBase + "/v6/assets";
			
			if(typeof assetIds === 'string'){
				if(assetIds.startsWith("[")){
					assetIds = assetIds.replace("[", "").replace("]", "").replace(/\"/g, "");
				}

				var assets = assetIds.split(",");
				
				assetIds = [];
				for(const asset of assets){
					assetIds.push(asset);
				}				
			}
			
			var params = {
					"load_type": "system",
					"level_of_detail": "slim",
					"selection_context": {
						"selection_context_param": {
							"selection_context": {
								"child_type": "ASSETS",
								"include_descendants": "NONE",	
								"type": "com.artesia.asset.selection.AssetIdsSelectionContext",															
								"include_devared_assets": false,
								"asset_ids": assetIds,
							}
						}
					}
			};
			
			
			var qs = await Assets.getQueryString(params);			
			link = link + "?" + qs;
			console.log(link);
			
			var result = await OTMMAPI.get(session, link, null);					
	
			return result.data;
		} catch (error) {
			console.error("Error retrieveAssets: " + error);
			return null;
		}	
	}
	 
	/**
	 * Retrieve all recent Asset
	 * <ul>
	 * 	<li>Method: GET</li>
	 * 	<li>API method: /v6/assets/recent</li>
	 * 	<li>URL example: https://developer.opentext.com/otmmapi/v6/assets/recent</li>
	 * </ul>	
	*/
	static async retrieveAllRecentAssets(session, loadType="full", limit=25){
		try {		
			var link = this.urlBase + "/v6/assets/recent";
			console.log("URL: " + link);
			
			var params = {
				//Data load type
				//Enum: "full" "system" "metadata" "inherited_metadata" "custom"
				load_type: "full",
				// Maximum number of items to retrieve.
				limit: 25
			};
			
			var result = await OTMMAPI.get(session, link, params);					
			
			return result.data;
		} catch (error) {
			console.error("Error retrieveAllRecentAssets: " + error);
			return null;
		}
	}
}