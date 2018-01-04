
//this is the endpoint
var youtube_search_url = 'https://www.googleapis.com/youtube/v3/search'
var result_html_template = (
	'<div>' + '<a class="js-result-name" href=""></a>' + '</div>' +
	'<div>' + '<a class="js-channel-name" href=""></a>' + '</div>' +
	'<div>' + '<img src="">' + '</div>')

//function to get data from API
function getDataFromAPI(searchTerm,callback) {
	let settings = {
		url: youtube_search_url,
		data: {
			q: searchTerm + 'in:name',
			part: 'snippet, id',
			key: 'AIzaSyDlweAdPWb-Gns_LarkrfTF54BY0RtAGOk',
		},
		dataType: 'json',
		type: 'GET',
		success: callback,
		};
	$.ajax(settings)
}

//function to retrieve and display search results
function displaySearchData(data) {
	let results = data.items.map(function(item,index){
		return renderResult(item)
	})
	$('.js-search-results').html(results)
}

//function to make search results clickable
function renderResult(result) {
	let template = $(result_html_template)
	template.find('.js-result-name').text(result.snippet.title).attr('href','http://www.youtube.com/watch?v=' + result.snippet.id)
	console.log(result.snippet.id)
	template.find('.js-channel-name').text(result.snippet.channelTitle).attr('href','http://www.youtube.com/channel/' + result.snippet.channelId)
	template.find('img').attr('src',result.snippet.thumbnails.medium.url)
	return template
}

//function that watches for search submit
function watchSubmit () {
	$('.js-query').submit(function(event){
		event.preventDefault()
		let queryTarget = $(this).find('#js-query-search')
		let query = queryTarget.val()
		queryTarget.val('')
		getDataFromAPI(query,displaySearchData)
		})
	}

$(watchSubmit);
//event listener to initial API call