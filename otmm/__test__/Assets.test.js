import Assets from '../Assets.js';
import OTMMAPI from '../OTMMAPI.js';
import Sessions from '../Sessions.js';

var session = null;

/** 
 * Setup and Teardown - https://jestjs.io/docs/setup-teardown
 */
beforeEach(async () => {
	session = await Sessions.createSession(OTMMAPI.user, OTMMAPI.pass);
});

test('Assets - retrieve all recent assets', async () => {		
	var assets = await Assets.retrieveAllRecentAssets(session);
	expect(assets).not.toBe(null);
	expect(assets.assets_resource).not.toBe(null);
	expect(assets.assets_resource.asset_list).not.toBe(null);
	expect(assets.assets_resource.asset_list.length).toBeGreaterThan(0);	
});  

