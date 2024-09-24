

// Run this when HTML page has finished loading
document.addEventListener("DOMContentLoaded", function() {
    
    console.log("The HTML page has finished loading!");
    callHistory();
    
});

// Run this when click Translate button
function getDataFromAPI() {
    
    let API_GATEWAY_ENDPOINT = `PASTE TRANSLATE STAGE URL HERE`;
    
    // get variable from your value input
    let word = document.getElementById('word').value;
    let source = document.getElementById('source').value;
    let target = document.getElementById('target').value;
    let formality = document.getElementById('formality').value;
    let profanity = document.getElementById('profanity').checked;


    let url_query = `?input_text=${word}&formality=${formality}&profanity=${profanity}&source=${source}&target=${target}`;

    // concatenate variable together   
    var API_ENDPOINT = API_GATEWAY_ENDPOINT + url_query;

    console.log('API_ENDPOINT:', API_ENDPOINT);

    return fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    // catch error for debuging
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Raw data received:', data);
        displayData(data);
        callHistory();
        return data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

//Display result of translating
function displayData(data) {
    const ansDivInfo = document.getElementById('ans-div');
    const word = document.getElementById('word');
    
    // Clear previous content
    ansDivInfo.innerHTML = '';

    ansDivInfo.innerHTML = `
    <textarea type="text" id="word" rows="${word.rows}" cols="${word.cols}" placeholder="Result">${data.output_text}</textarea>
    `
}

function callHistory(){
    var API_ENDPOINT_HISTORY = `PASTE HISTORY STAGE URL HERE`;

    console.log('API_ENDPOINT_HISTORY:', API_ENDPOINT_HISTORY);
    const response = fetch(API_ENDPOINT_HISTORY, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    // catch error for debuging
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayHistory(data);
    }).catch(
        error => {throw new Error(`HTTP error! status: ${error}`)}
    );

}

//display log to screen
function displayHistory(data){
    const history = document.getElementById('history-tr-td');

    history.innerHTML = '';

    body = data.body;

    var row = `            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Source</th>
                    <th>Output</th>
                </tr>
            </thead>`;
    body.forEach(key => {
        row += 
        `<tr>
            <td>${key.timestamp}</td>
            <td>${key.input_text}</td>
            <td>${key.output_text}</td>
        </tr>`;
    });

    history.innerHTML = row;
}
