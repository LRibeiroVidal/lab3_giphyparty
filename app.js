// Global Constants
const API_KEY = "d8AvpjXdqBUZy0plkmJNQjoPOEfWfAi8";
const LIMIT_ENTRIES = 15;
const RATING_ENTRIES = "pg";

var moreGifs = 0;
var searchterm = "";
var offset = moreGifs * LIMIT_ENTRIES;


function getResults() {
    document.querySelector("form").addEventListener("submit", async (evt) => {
        clearQuery();
        // this prevents the page from re-loading
        evt.preventDefault();
      
        // logs for debugging, open the inspector!
        console.log("evt.target.query.value = ", evt.target.query.value);
        searchterm = evt.target.query.value;
        let apiUrl = `
        https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchterm}&limit=${LIMIT_ENTRIES}&offset=0&rating=${RATING_ENTRIES}&lang=en
        `;
    
        console.log(apiUrl);
        
        // try catch to handle unexpected api errors
        try {
            let response = await fetch(apiUrl);
    
            // now call is made, but data still not arrived
            console.log("response is: ", response);
    
            let responseData = await response.json();
          
            // now have actual data
            console.log("responseData is: ", responseData);
    
            generateHTML(responseData);
          
        } catch (e) {
            generateError(evt.target.query.value);
        }

        document.querySelector("#load-more-gifs").classList.remove("hidden");
    });

}

const generateError = (err) => {
    document.lastChild.innerHTML += `
        <span style="color: red;">${err} not found</span>
    `;
}

function generateHTML(gifData) {
    gifData.data.forEach(gif => {
        console.log(gif.url);
        document.querySelector("#results").innerHTML += `
        <a href="${gif.url}" target="blank">
            <img src="${gif.images.original.url}" alt="${gif.title}" width="250" height="250" class="thumbnail">
        </a>
    `;
    })
}

function clearQuery() {
    document.querySelector("#results").innerHTML = "";
}


getResults();

document.querySelector("#load-more-gifs").addEventListener("click", async (evt) => {
    moreGifs+=1;
    offset = moreGifs * LIMIT_ENTRIES;
    console.log("Got here");
    evt.preventDefault();
      
    // logs for debugging, open the inspector!
    console.log("evt.target.query.value = ", searchterm);
  
    let apiUrl = `
    https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchterm}&limit=${LIMIT_ENTRIES}&offset=${offset}&rating=${RATING_ENTRIES}&lang=en
    `;

    console.log(apiUrl);
    
    // try catch to handle unexpected api errors
    try {
        let response = await fetch(apiUrl);

        // now call is made, but data still not arrived
        console.log("response is: ", response);

        let responseData = await response.json();
      
        // now have actual data
        console.log("responseData is: ", responseData);

        generateHTML(responseData);
      
    } catch (e) {
        generateError(searchterm);
    }
});
