import Sessions from '../otmm/Sessions.js';

export default class SessionsController {
    static async apiCreateSessions(req, res, next) {
        const user = req.body.user;
        const password = req.body.password;

        let responde = null;
        if(user && typeof user !== 'undefined' && password && typeof password !== 'undefined'){
        	responde = await Sessions.createSession(user, password);
        }
        else{
        	responde = {error: "user and password are mandatory"};
        }

        res.json(response);
	}
}
