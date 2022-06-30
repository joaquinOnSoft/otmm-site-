import request from 'supertest';
import OTMMAPI from '../../otmm/OTMMAPI.js';

// https://www.rithmschool.com/courses/intermediate-node-express/api-tests-with-jest
// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6

describe("OTMM Site API test", () => {
  test("POST /api/v1/sessions ", async () => {
	const headers = {
		'Content-Type': 'application/json'
	}
	const body = {
    	"user": OTMMAPI.user,
		"password": OTMMAPI.pass
	};
		
    const response = await request('http://localhost:5000')
		.post("/api/v1/sessions")
		.set(headers)
		.send(body);
    //expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
    expect(response.statusCode).toBe(200);	
	expect(JSON.stringify(response.text)).not.toBe(undefined);
		
	let responseJSON = JSON.parse(response.text);
	
	expect(responseJSON).not.toBe(undefined);	
	expect(responseJSON.session_resource).not.toBe(undefined);	
	expect(responseJSON.session_resource.session).not.toBe(undefined);
	expect(responseJSON.session_resource.session.domain_name).toBe("OTMM");
  });
});