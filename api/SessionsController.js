import Sessions from '../otmm/Sessions.js';

export default class SessionsController {
	
	/**
	 * <strong>Create a Session</strong>
	 * Create a security Session in OTMM. It returns a valid SecuritySession
	 * object if the provided credentials are valid. This is equivalent to login to OTMM
	 * <ul>
	 * 	<li>Method: POST</li>
	 * 	<li>API method: /api/v1/sessions</li>
	 * 	<li>URL example: http://localhost:5000/api/v1/sessions</li>
	 * 	<li>Body (raw), e.g.:
 	 * 		<code>
	 * 		{
     * 			"user": "myusernameexample",
	 * 			"password": "mypasswordexample"
	 *		}
	 * 		</code>
	 * </li>
	 * </ul>
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
    static async apiCreateSessions(req, res, next) {
		console.log("apiCreateSessions called!");
        const user = req.body.user;
        const pass = req.body.password;

        let response = null;
        if(user && typeof user !== 'undefined' && pass && typeof pass !== 'undefined'){
			console.log("Create session...");
        	response = await Sessions.createSession(user, pass);
        }
        else{
			console.log("user and password are mandatory");
        	response = {error: "user and password are mandatory"};
        }

        res.json(response);
	}
	
}
