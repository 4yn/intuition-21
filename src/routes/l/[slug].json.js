export function get(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

	const { slug } = req.params;

	if (false) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Link not found`
		}));
	}
}
