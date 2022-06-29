import AbstractOTMMController from './AbstractOTMMController.js';
import Assets from '../otmm/Assets.js';

export default class AssetsController extends AbstractOTMMController{
	
	/**
	 * <strong>Retrieve assets based on the provided selection context.</strong>
	 * <ul>
	 * 	<li>Method: GET</li>
	 * 	<li>API method: /api/v1/assets</li>
	 * 	<li>URL example: http://localhost:5000/api/v1/assets</li>
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
	 * 	<li>Query params:	 
	 *		<ul>
	 *			<li>
	 *				<strong>arrayIds</strong>: Array of asset identifiers.
	 *			</li>
	 *		</ul>	 
	 * 	</li>
	 * </ul>
	 * @return 
	 */
    static async apiRetrieveAssets(req, res, next) {
		console.log("apiRetrieveAssets called!");
		
		let session = AbstractOTMMController.prepareSession(req);
		let assetIds = req.query.assetIds;
	
    	let response = await Assets.retrieveAssets(session, assetIds);
		
        res.json(response);
	}
	
    static async apiRetrieveAllRecentAssets(req, res, next) {
		console.log("apiRetrieveAssets called!");
		
		let session = AbstractOTMMController.prepareSession(req);
		let loadType = req.query.loadType || "full"; 
		let limit = req.query.limit || 25;
			
    	let response = await Assets.retrieveAllRecentAssets(session, loadType, limit);
		
        res.json(response);
	}		
}
