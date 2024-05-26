const {createProxyMiddleware} = require("http-proxy-middleware");

const getTarget = (req) => {
	const host = req.headers.host;
    if (host.startsWith('games.')) {
		return {default: 'http://localhost:8081', socket: 'http://localhost:8080'}
    } else if (host.startsWith('blog.')) {
		return {default: 'http://localhost:8083', socket: 'http://localhost:8082'}
    } else {
        return {default:null, socket:null};
    };
};

const proxyMiddleware = (req, res, next) => {
	const target = getTarget(req).default;
	if (target) {
		return createProxyMiddleware({
			target,
			changeOrigin: true,
			logLevel: 'debug',
		})(req, res, next);
	} else {
		res.status(404).send("Not Found");
	};
};

module.exports = {proxyMiddleware};
