// fetch(url,{ headers: { 'Authorization': 'Basic' + `${apiKey}:`.toString('Base64') } })
// 	.then(response => response.json())
// 	.then(json => console.log(json))
// 	.catch(err => {
// 		const fetchError = document.getElementById('fetch-error-sncf');

// 		if (!fetchError.classList.contains('active')) {
// 			fetchError.classList.toggle('active');
// 		}
// 		console.error(`Unable to fetch data: ${err}`);
// 	});

//For testing purpose, and while I find a way to store the Novatia api key, I forst consider
//that the request from novatia fails to display a little banner on the transport card

const fetchError = document.getElementById('fetch-error-sncf');

if (!fetchError.classList.contains('active')) {
	fetchError.classList.toggle('active');
}
