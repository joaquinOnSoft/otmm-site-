import AssetsController from './AssetsController.js';

export default class AssetsRoute {
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
		router.route('/').get(AssetsController.apiRetrieveAssets);
		return router;
	}
}