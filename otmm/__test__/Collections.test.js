import Collections from '../Collections.js';
import OTMMAPI from '../OTMMAPI.js';
import Sessions from '../Sessions.js';

var session = null;

/**
 * Setup and Teardown - https://jestjs.io/docs/setup-teardown
 */
beforeAll(async() => {
    session = await Sessions.createSession(OTMMAPI.user, OTMMAPI.pass);
});

test('Collections - Get list of collections for current user', async() => {
    var collections = await Collections.getListOfCollectionsForCurrentUser(session);
    expect(collections).not.toBe(null);
    expect(collections.collection_resource).not.toBe(null);
    expect(collections.collection_resource.collection_summary).not.toBe(null);
    expect(collections.collection_resource.collection_summary.limit).toBe(5000);
    expect(collections.collection_resource.collection).not.toBe(null);
    expect(collections.collection_resource.collection.length).toBeGreaterThan(0);
});
