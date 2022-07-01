import AbstractOTMMController from './AbstractOTMMController.js';
import Collections from '../otmm/Collections.js';

export default class CollectionsController extends AbstractOTMMController {

    /**
     * <strong>Get list of collections for current user</strong>
     * <ul>
     * 	<li>Method: GET</li>
     * 	<li>API method: /api/v1/collections</li>
     * 	<li>URL example: http://localhost:5000/api/v1/collections</li>
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
     * </ul>
     * @return
     */
    static async apiGetListOfCollectionsForCurrentUser(req, res, next) {
        console.log("apiGetListOfCollectionsForCurrentUser called!");

        let session = AbstractOTMMController.prepareSession(req);

        let response = await Collections.getListOfCollectionsForCurrentUser(session);

        res.json(response);
    }

}
