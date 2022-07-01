import axios from 'axios';
import querystring from 'node:querystring';
import OTMMAPI from './OTMMAPI.js';


export default class Sessions extends OTMMAPI {
	/**
	 * <strong>Create a Session</strong>
	 * Create a security Session in OTMM. It returns a valid SecuritySession
	 * object if the provided credentials are valid. This is equivalent to login to OTMM
	 * <ul>
	 * 	<li>Method: POST</li>
	 * 	<li>API method: /v6/sessions</li>
	 * 	<li>URL example: https://developer.opentext.com/otmmapi/v6/sessions</li>
	 * </ul>
	 * <strong>NOTE:</strong>
	 * With the exception of methods related to 'sessions', any call to an OTMM REST API
	 * method must include the session id in the 'X-Requested-By' header.
	 * @param user - User alias
	 * @param pass - User password
	 * @return session information
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
	 *		  _userfull_name: 'admin, otmm',
	 *		  _userid: '1001',
	 *		  _userrole_id: 1,
	 *		  validation_key: -2045393682
	 *		}
	 *	  }
	 *	}
	 * </code>
	 */
	static async createSession(_user, _pass){
		try {
			let link = this.urlBase + "/v6/sessions";
			console.log("URL: " + link);
			
			let anonymousLogin = process.env.ANONYMOUS_LOGIN_ENABLED || "false";
			console.debug("Environment variable ANONYMOUS_LOGIN_ENABLED: " + anonymousLogin);
			
			if(anonymousLogin.toLowerCase() == 'true' ){
				if (typeof _user === 'undefined' || _user == null){
					console.debug("Using default user to initialize 'user'");
					_user = OTMMAPI.user;
				}
				if (typeof _pass === 'undefined' || _pass == null){				
					console.debug("Using default user to initialize 'password'");
					_pass = OTMMAPI.pass;
				}
			}
			
			let payloadJSON  = {
				"username": _user,
				"password": _pass
			};
							
			let payload =  (new URLSearchParams(payloadJSON)).toString()

			const resp = await axios.post(link, payload, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				}
			});
			
			return resp.data;
		} catch (err) {
			console.error(err);
			return null;
		}
	}
}