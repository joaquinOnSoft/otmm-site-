import request from 'supertest';
import OTMMAPI from '../../otmm/OTMMAPI.js';
import Sessions from '../../otmm/Sessions.js';

var headers = null;

beforeAll(async() => {
	var session = await Sessions.createSession();
	headers = {
		'id': session.session_resource.session.id,
		"message_digest": session.session_resource.session.message_digest
	}

	console.log(headers);
});

describe("OTMM Site API - Search test", () => {
	
    test("GET /api/v1/search/text", async() => {

        const params = {
            "keywords": "London"
        };

        const response = await request(process.env.SERVER_URL_TEST)
            .get("/api/v1/search/text")
            .set(headers)
            .query(params);

        expect(response.statusCode).toBe(200);

        let responseJSON = JSON.parse(response.text);

        expect(responseJSON).not.toBe(undefined);
        expect(responseJSON.search_result_resource).not.toBe(undefined);
        expect(responseJSON.search_result_resource.search_result).not.toBe(undefined);
        expect(responseJSON.search_result_resource.search_result.asset_id_list).not.toBe(undefined);
        expect(responseJSON.search_result_resource.search_result.asset_id_list.length).toBeGreaterThan(0);
    });
});
