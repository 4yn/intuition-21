export function get(req, res, next) {
	// Get statistics of previously created links

	res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify([]));
}
