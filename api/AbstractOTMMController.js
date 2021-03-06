export default class AbstractOTMMController {

    static prepareSession(req) {

        const id = req.headers.id;
        const messageDigest = req.headers.message_digest;

        console.log(`\t id: ${id}`);
        console.log(`\t message_digest: ${messageDigest}`);

        let headers = {
            session_resource: {
                session: {
                    id: id,
                    message_digest: messageDigest
                }
            }
        };

        return headers;
    }

}
