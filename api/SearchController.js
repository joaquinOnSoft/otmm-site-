import AbstractOTMMController from './AbstractOTMMController.js';
import Search from '../otmm/Search.js';

export default class SearchController extends AbstractOTMMController{
	
	/**
	 * <strong>Get list of collections for current user</strong>
	 * <ul>
	 * 	<li>Method: GET</li>
	 * 	<li>API method: /api/v1/search/text</li>
	 * 	<li>URL example: http://localhost:5000/api/v1/search/text</li>
	 *  <li>
	 *    Headers:
	 *		<ul>
	 *			<li>
	 *				<strong>id</strong>: Session identifier, e.g. 471542185
	 *			</li>
	 *			<li>
	 *				<strong>message_digest</strong>: string of digits created by a one-way hashing formula, e.g. 'b8271108836bef44130e71ee91bd51d4e75e2733'
	 *          </li>
	 *		</ul>
	 *  </li>
	 *  <li>
	 *    Parameters (query string):
	 *		<ul>
	 *			<li>keywords - The keyword search query</li>
	 *			<li>after - Retrieve a list of assets starting at the position after the specified value. 
	 *				If neither the after or before parameters are specified this is equivalent to after=0 
	 *				and will retrieve items starting at the beginning of the list of assets.</li>
	 *			<li>limit - Maximum number of items to retrieve.</li>
	 * </ul>
	 */
    static async apiPerformTextBasedSearch(req, res, next) {
		console.log("apiPerformTextBasedSearch called!");
		
		let keywords = req.query.keywords;
		let after = req.query.after || 2;
		let limit = req.query.limit || 200;

		let response = {"error": "`keywords` is mandatory. Can't be empty."};
		if (typeof keywords !== 'undefined'){
			let session = AbstractOTMMController.prepareSession(req);		
		
			response = await Search.performTextBasedSearch(session, keywords, after, limit);
		}
		
        res.json(response);
	}
	
}
