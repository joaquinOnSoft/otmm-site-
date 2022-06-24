import OTMMAPI from './OTMMAPI.js';

const SQUARE_BRACket_LEFT = "%5B";
const SQUARE_BRACket_RIGHT = "%5D";
	
export default class Assets extends OTMMAPI {
	
	/**
	 * Retrieve assets based on the provided selection context.
	 * <ul>
	 * 	<li>Method: GET</li>
	 * 	<li>API method: /v6/assets</li>
	 * 	<li>URL example: https://developer.opentext.com/otmmapi/v6/assets</li>
	 * </ul>	
	 * @param session
	 * @param assetIds - Array of asset identifiers or a single asset identifier (string)
	 */
	static async retrieveAssets(session, assetIds){	
		try {		
			let link = this.urlBase + "/v6/assets";
			console.log("URL: " + link);
			console.log("assetIds: " + assetIds);


			// java.lang.IllegalArgumentException: Invalid character found in the request target 
			// [/otmmapi/v6/assets?load_type=system&level_of_detail=slim&selection_context=%7B%22selection_context_param%22:%7B%22selection_context%22:%7B%22child_type%22:%22ASSETS%22,%22include_descendants%22:%22NONE%22,%22type%22:%22com.artesia.asset.selection.AssetIdsSelectionContext%22,%22include_deleted_assets%22:false,%22asset_ids%22:[%22411811a6608665e00d3bac8671e67cad043fd40a%22]%7D%7D%7D ]. 
			// The valid characters are defined in RFC 7230 and RFC 3986
			//
			// https://stackoverflow.com/questions/54287922/the-valid-characters-are-defined-in-rfc-7230-and-rfc-3986
			// If you use an upper version of Tomcat 8.5 it throws this exception if the URL path contains '[' and ']'. For older versions, it works.
			if(Array.isArray(assetIds)){
				var assetIdsStr = SQUARE_BRACket_LEFT;
				assetIds.forEach(id => assetIdsStr += id);	
				assetIdsStr = SQUARE_BRACket_RIGHT;
				
				assetIds = assetIdsStr;
			}
			else if (typeof assetIds === 'string' || assetIds instanceof String) {					
				assetIds = SQUARE_BRACket_LEFT  + assetIds + SQUARE_BRACket_RIGHT;
			}
					

			let params = {
					"load_type": "system",
					"level_of_detail": "slim",
					"selection_context": {
						"selection_context_param": {
							"selection_context": {
								"child_type": "ASSETS",
								"include_descendants": "NONE",	
								"type": "com.artesia.asset.selection.AssetIdsSelectionContext",															
								"include_deleted_assets": false,
								"asset_ids": assetIds,
							}
						}
					}
			};
			
			console.log("params: " + JSON.stringify(params));

			let result = await OTMMAPI.get(session, link, params);					
			
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
			let link = this.urlBase + "/v6/assets/recent";
			console.log("URL: " + link);
			
			let params = {
				//Data load type
				//Enum: "full" "system" "metadata" "inherited_metadata" "custom"
				load_type: "full",
				// Maximum number of items to retrieve.
				limit: 25
			};
			
			let result = await OTMMAPI.get(session, link, params);					
			
			return result.data;
		} catch (error) {
			console.error("Error retrieveAllRecentAssets: " + error);
			return null;
		}
	}
}