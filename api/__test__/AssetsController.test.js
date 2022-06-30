import request from 'supertest';
import OTMMAPI from '../../otmm/OTMMAPI.js';
import Sessions from '../../otmm/Sessions.js';

var headers = null;

beforeEach(async () => {
	var session = await Sessions.createSession(OTMMAPI.user, OTMMAPI.pass);
	headers = {
		'id': session.session_resource.session.id,
		"message_digest": session.session_resource.session.message_digest
	}
});

describe("OTMM Site API - Assets test", () => {
  test("GET /api/v1/assets ", async () => {
	
	const params = {
    	"assetIds": ["411811a6608665e00d3bac8671e67cad043fd40a", "b156decf0fba4323e646438f0c64f36856b382ef"]
	};
		
    const response = await request('http://localhost:5000')
		.get("/api/v1/assets")
		.set(headers)
		.query(params);
    
    expect(response.statusCode).toBe(200);
		
	let responseJSON = JSON.parse(response.text);
	
	expect(responseJSON).not.toBe(undefined);	
	expect(responseJSON.assets_resource).not.toBe(undefined);	
	expect(responseJSON.assets_resource.asset_list).not.toBe(undefined);
	expect(responseJSON.assets_resource.asset_list.length).toBe(2);
  });
  
  
  
  test("GET /api/v1/assets/recent ", async () => {
    const response = await request('http://localhost:5000')
		.get("/api/v1/assets/recent")
		.set(headers);
    
    expect(response.statusCode).toBe(200);
		
	let responseJSON = JSON.parse(response.text);
	
	expect(responseJSON).not.toBe(undefined);	
	expect(responseJSON.assets_resource).not.toBe(undefined);	
	expect(responseJSON.assets_resource.asset_list).not.toBe(undefined);
	expect(responseJSON.assets_resource.asset_list.length).toBe(25);
  });  
});