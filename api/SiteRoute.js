import AssetsController from './AssetsController.js';
import CollectionsController from './CollectionsController.js';
import SessionsController from './SessionsController.js';

export default class SiteRoute {
	/**
	 * Some URL exampmples:
	 * <strong>GET</strong> <strong>/api/v1/assets</strong> 
	 * Retrieve assets based on the provided selection context.
	 * <ul>
	 *     <li>GET - http://localhost:5000/api/v1/assets</li>
	 * </ul>
	 * 
	 */
	static configRoutes(router){
		router.route('/assets').get(AssetsController.apiRetrieveAssets);
		//router.route('/assets/recent').get(AssetsController.apiRetrieveAssets);		
		router.route('/collections').get(CollectionsController.apiGetListOfCollectionsForCurrentUser);
		//router.route('/').post(SessionsController.apiCreateSessions);
		router.route('/sessions').post(SessionsController.apiCreateSessions);

		return router;
	}
}