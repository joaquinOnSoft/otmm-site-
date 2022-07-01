import request from 'supertest';
import OTMMAPI from '../../otmm/OTMMAPI.js';
import Sessions from '../../otmm/Sessions.js';

var headers = null;

beforeEach(async() => {
    var session = await Sessions.createSession(OTMMAPI.user, OTMMAPI.pass);
    headers = {
        'id': session.session_resource.session.id,
        "message_digest": session.session_resource.session.message_digest
    }

    console.log(headers);
});

describe("OTMM Site API - collections test", () => {
    test("GET /api/v1/collections", async() => {

        const response = await request(process.env.SERVER_URL_TEST)
            .get("/api/v1/collections")
            .set(headers);

        expect(response.statusCode).toBe(200);
        expect(JSON.stringify(response.text)).not.toBe(undefined);

        let responseJSON = JSON.parse(response.text);

        expect(responseJSON).not.toBe(undefined);
        expect(responseJSON.collection_resource).not.toBe(undefined);
        expect(responseJSON.collection_resource.collection).not.toBe(undefined);
        expect(responseJSON.collection_resource.collection.length).toBeGreaterThan(0);
    });
});
