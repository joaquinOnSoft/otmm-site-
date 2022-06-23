import OTMMAPI from './OTMMAPI.js';

export default class Collections extends OTMMAPI {
	
	/**
	 * Get list of collections for current user
	 * @see <a href="https://masteringjs.io/tutorials/axios/headers">Setting Request Headers with Axios</a>
	 */
	static async getListOfCollectionsForCurrentUser(session){
		try {		
			let link = this.urlBase + "/v6/collections";
			console.log("URL: " + link);
			
			let result = await OTMMAPI.get(session, link, null);					
			
			return result.data;
		} catch (error) {
			console.error("Error getListOfCollectionsForCurrentUser: " + error);
			return null;
		}
	}	
}