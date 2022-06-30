import AssetsController from './AssetsController.js';
import CollectionsController from './CollectionsController.js';
import SearchController from './SearchController.js';
import SessionsController from './SessionsController.js';

export default class SiteRoute {
	/**
	 */
	static configRoutes(router){
		router.route('/assets').get(AssetsController.apiRetrieveAssets);
		router.route('/assets/recent').get(AssetsController.apiRetrieveAllRecentAssets);		
		router.route('/collections').get(CollectionsController.apiGetListOfCollectionsForCurrentUser);
		router.route('/search/text').get(SearchController.apiPerformTextBasedSearch);
		router.route('/sessions').post(SessionsController.apiCreateSessions);

		return router;
	}
}