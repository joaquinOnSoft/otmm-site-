import OTMMAPI from './OTMMAPI.js';

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
						
			if (typeof assetIds === 'string' || assetIds instanceof String) {					
				assetIds = [assetIds];
			}
					
			let params = {
					"selection_context": {
						"selection_context_param": {
							"selection_context": {
								"asset_ids": assetIds,
								"type": "com.artesia.asset.selection.AssetIdsSelectionContext",
								"include_descendants": "NONE",
								"child_type": "ASSETS",
								"include_deleted_assets": false
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