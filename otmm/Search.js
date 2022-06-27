import OTMMAPI from './OTMMAPI.js';

export default class Search extends OTMMAPI {
	
	/**
	 * Perform a text based Search.
	 * Generate a search result from the text search engine.
	 * <ul>
	 * 	<li>Method: GET</li>
	 * 	<li>API method: /v6/search/text</li>
	 * 	<li>URL example: https://developer.opentext.com/otmmapi/v6/search/text</li>
	 * </ul>
	 */
	static async performTextBasedSearch(session, keywords){
		try {		
			let link = this.urlBase + "/v6/search/text";
			console.log("URL: " + link);
			
			let params ={
				"keyword_query": keywords,
				"load_type": "metadata",
				"load_multilingual_values": true,
				"level_of_detail": "slim",
				"after": 0,
				"limit": 200,
				"multilingual_language_code": "en_US",
				//"search_config_id": 3,
				//1 - Metadata, 2 - File Content, 3 - Metadata and Content
				"keyword_scope_id": 3,
				"preference_id": "ARTESIA.PREFERENCE.GALLERYVIEW.DISPLAYED_FIELDS",
				"metadata_to_return": "ARTESIA.FIELD.TAG",
				"sort": "desc_ARTESIA.FIELD.ASSET ID"
			};
			
			let result = await OTMMAPI.get(session, link, params);					
			console.log(result);
			return result.data;
		} catch (error) {
			console.error("Error performTextBasedSearch: " + error);
			return null;
		}
	}	
}