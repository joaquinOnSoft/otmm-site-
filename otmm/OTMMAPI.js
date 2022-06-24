import axios from 'axios';
import qs from 'qs';
import 'dotenv/config';

//const urlBase = process.env.OTMM_API_URL;

export default class OTMMAPI {

	static urlBase = process.env.OTMM_API_URL;
	static user = process.env.OTMM_USER;
	static pass = process.env.OTMM_PASSWORD;

	/**
	 * Do a GET call to an API method
	 * @param session - OTMM session object that looks like this:
	 * <code>
	 * {
	 *	  session_resource: {
	 *		session: {
	 *		  domain_name: 'OTMM',
	 *		  id: 471542185,
	 *		  local_session: false,
	 *		  login_name: 'tsuper',
	 *		  message_digest: 'b8271108836bef44130e71ee91bd51d4e75e2733',
	 *		  role_name: 'Administrator',
	 *		  user_full_name: 'admin, otmm',
	 *		  user_id: '1001',
	 *		  user_role_id: 1,
	 *		  validation_key: -2045393682
	 *		}
	 *	  }
	 *	}
	 * </code>
	 * @param url - URL of the API method
	 * @param parameters - method parameters
	 * */
	static async get(session, url, parameters){
		if(parameters == null){
			parameters = {};
		}
		
		return await axios.get(url, 
				{
					headers: {
						"X-Requested-By": session.session_resource.session.id,
						"Authorization":  "Bearer otmmToken " + session.session_resource.session.message_digest,
						"otmmauthtoken":  session.session_resource.session.message_digest
					},
					params: parameters,
					paramsSerializer: params => {
						return qs.stringify(params)
					}
				});
	}
}

