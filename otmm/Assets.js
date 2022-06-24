import OTMMAPI from './OTMMAPI.js';

export default class Assets extends OTMMAPI {
	
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