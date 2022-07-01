import Search from '../Search.js';
import OTMMAPI from '../OTMMAPI.js';
import Sessions from '../Sessions.js';

var session = null;

/**
 * Setup and Teardown - https://jestjs.io/docs/setup-teardown
 */
beforeEach(async() => {
    session = await Sessions.createSession(OTMMAPI.user, OTMMAPI.pass);
});

test('Search - Perform a text based Search', async() => {
    var results = await Search.performTextBasedSearch(session, "London");
    expect(results).not.toBe(null);
    expect(results.search_result_resource).not.toBe(null);
    expect(results.search_result_resource.search_result).not.toBe(null);
    expect(results.search_result_resource.search_result.asset_id_list).not.toBe(null);
    expect(results.search_result_resource.search_result.asset_id_list.length).toBeGreaterThan(0);
    expect(results.search_result_resource.search_result).not.toBe(null);
    expect(results.search_result_resource.search_result.facet_field_response_list).not.toBe(null);
    expect(results.search_result_resource.search_result.facet_field_response_list.length).toBeGreaterThan(0);
});

test('Search - Perform a text based Search (after 5)', async() => {
    var results = await Search.performTextBasedSearch(session, "London", 5);
    expect(results).not.toBe(null);
    expect(results.search_result_resource).not.toBe(null);
    expect(results.search_result_resource.search_result).not.toBe(null);
    expect(results.search_result_resource.search_result.asset_id_list).not.toBe(null);
    expect(results.search_result_resource.search_result.asset_id_list.length).toBeGreaterThan(0);
    expect(results.search_result_resource.search_result).not.toBe(null);
    expect(results.search_result_resource.search_result.facet_field_response_list).not.toBe(null);
    expect(results.search_result_resource.search_result.facet_field_response_list.length).toBeGreaterThan(0);
});

test('Search - Perform a text based Search (after 5 and limit 10)', async() => {
    var results = await Search.performTextBasedSearch(session, "London", 5, 10);
    expect(results).not.toBe(null);
    expect(results.search_result_resource).not.toBe(null);
    expect(results.search_result_resource.search_result).not.toBe(null);
    expect(results.search_result_resource.search_result.asset_id_list).not.toBe(null);
    expect(results.search_result_resource.search_result.asset_id_list.length).toBe(10);
    expect(results.search_result_resource.search_result).not.toBe(null);
    expect(results.search_result_resource.search_result.facet_field_response_list).not.toBe(null);
    expect(results.search_result_resource.search_result.facet_field_response_list.length).toBeGreaterThan(0);
});
