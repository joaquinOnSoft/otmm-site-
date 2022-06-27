import MoviesController from './SessionsController.js';

export default class SesionsRoute {
	/**
	 * Some URL exampmples:
	 * <strong>POST</strong> <strong>/api/v1/sessions</strong> Create a Session
	 * <ul>
	 *     <li>http://localhost:5000/api/v1/sessions</li>
	 * </ul>
	 * 
	 */
	static configRoutes(router){
		router.route('/').get(SessionsController.apiCreateSessions);
		return router;
	}
}