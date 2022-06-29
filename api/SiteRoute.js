import AssetsController from './AssetsController.js';
import CollectionsController from './CollectionsController.js';
import SessionsController from './SessionsController.js';

export default class SiteRoute {
	/**
	 */
	static configRoutes(router){
		router.route('/assets').get(AssetsController.apiRetrieveAssets);
		router.route('/assets/recent').get(AssetsController.apiRetrieveAllRecentAssets);		
		router.route('/collections').get(CollectionsController.apiGetListOfCollectionsForCurrentUser);
		//router.route('/').post(SessionsController.apiCreateSessions);
		router.route('/sessions').post(SessionsController.apiCreateSessions);

		return router;
	}
}