export async function get(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

	//const { slug } = req.params;

    console.log(req)
    console.log("SESSION")
    console.log(req.session)
    console.log("HEaDER")
    console.log(req.headers)
    console.log("USER AGENT")
    console.log(req.headers['user-agent'])
    console.log("SESSION ID")
    console.log(req.sessionID)

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    var msg = req.sessionID;

    res.end(JSON.stringify(msg));

}
