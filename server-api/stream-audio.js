const http = require('http')
const axios = require('axios')
const querystring = require('querystring');
const url = require('url');

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url);
	const queryParams = querystring.parse(parsedUrl.query);

	if (parsedUrl.pathname === '/audio') {
		const textToTranslate = queryParams.text || 'Tôi không tìm thấy nội dung sách';

		axios({
			url: `https://translate.google.com/translate_tts?client=tw-ob&q=${encodeURIComponent(textToTranslate)}&tl=vi`,
			method: 'GET',
			responseType: 'stream'
		})
			.then(response => {
				res.writeHead(200, {
					'Content-Type': 'audio/mpeg',
					'Access-Control-Allow-Origin': '*'
				})
				response.data.pipe(res)
			})
			.catch(error => {
				res.writeHead(500)
				res.end(JSON.stringify(error))
			})
	} else {
		res.writeHead(404)
		res.end()
	}
})

server.listen(2001, () => {
	console.log('Server is running at http://localhost:2001')
})
