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

test('Retrieve assets based on the provided selection context (Multiple Ids)', async () => {		
	var assetIds = ["411811a6608665e00d3bac8671e67cad043fd40a", "b156decf0fba4323e646438f0c64f36856b382ef"];
	
	var assets = await Assets.retrieveAssets(session, assetIds);
	expect(assets).not.toBe(null);
	expect(assets.assets_resource.asset_list).not.toBe(null);
	expect(assets.assets_resource.asset_list.length).toBe(2);		
});  

test('Retrieve assets based on the provided selection context (Single Id)', async () => {		
	var assetIds = "411811a6608665e00d3bac8671e67cad043fd40a";
	
	var assets = await Assets.retrieveAssets(session, assetIds);
	expect(assets).not.toBe(null);
	expect(assets.assets_resource.asset_list).not.toBe(null);
	expect(assets.assets_resource.asset_list.length).toBe(1);
});  

test('Assets - retrieve all recent assets', async () => {		
	var assets = await Assets.retrieveAllRecentAssets(session);
	expect(assets).not.toBe(null);
	expect(assets.assets_resource).not.toBe(null);
	expect(assets.assets_resource.asset_list).not.toBe(null);
	expect(assets.assets_resource.asset_list.length).toBeGreaterThan(0);	
});  
