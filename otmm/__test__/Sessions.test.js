import OTMMAPI from '../OTMMAPI.js';
import Sessions from '../Sessions.js';

test('Create session with .env config', async () => {	
	//await expect(Sessions.createSession(OTMMAPI.user, OTMMAPI.pass)).resolves.not.toBe(null);
	var session = await Sessions.createSession(OTMMAPI.user, OTMMAPI.pass);
	expect(session).not.toBe(null);
	expect(session.session_resource).not.toBe(null);
	expect(session.session_resource.session).not.toBe(null);
	expect(session.session_resource.session.domain_name).toBe('OTMM');
	expect(session.session_resource.session.local_session).toBe(false);
});  

