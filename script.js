const url = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

// Define the API key and format
const api_key = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
const format = 'json';

// Define the parameters for the request
const params = new URLSearchParams({
    'api-key': api_key,
    'format': format,
});

// Build the complete URL
const apiUrl = `${url}?${params}`;

// Create the headers for the request
const headers = new Headers({
    'accept': 'application/json', // Change to 'application/json'
});
let newsHtml = " ";
let newsAccordion = document.getElementById("LiveData");
// Make the GET request to the API
fetch(apiUrl, { method: 'GET', headers: headers })
    .then(response => {
        if (response.status === 200) {
            return response.json(); // Use response.json() to parse JSON data
        } else {
            throw new Error('Error: ' + response.status);
        }
    })
    .then(data => {
        // Now you can access the "records" field in JSON data
        const records = data.records;
        console.log(data);
        console.log(records);

        // ...

        // Iterate through the array and construct the HTML for each record
        records.forEach(record => {
            let data = `
     <div class="commodityPrice">
                <div class="ItemCity">
                    <div class="item">${record.commodity}</div>
                    <div class="city">${record.state} (${record.market})</div>
                </div>
                <div class="price">
                    <div class="max">
                        <p class="maxPrice">MAX PRICE</p>
                        <p>${record.max_price} INR</p>
                    </div>
                    <div class="min">
                        <p class="maxPrice">MIN PRICE</p>
                        <p>${record.min_price} INR</p>
                    </div>
                </div>
            </div>
        `; // Note that each <h1> tag has a corresponding closing </h1> tag
            newsHtml += data;
        });
        // Assuming you have an element with the id 'main' in your HTML
        const newsAccordion = document.getElementById("LiveData");

        // Set the innerHTML of 'newsAccordion' with the generated HTML
        newsAccordion.innerHTML = newsHtml;



        // min and max price show 

        // Find the record with the highest price
        let highestPriceRecord = null;
        let highestPrice = Number.NEGATIVE_INFINITY;

        records.forEach(record => {
            if (record.max_price > highestPrice) {
                highestPrice = record.max_price;
                highestPriceRecord = record;
            }
        });

        // Create HTML for the highest price commodity
        if (highestPriceRecord) {
            let highestPriceHtml = `
        <div class="highest">
            <p>Today's Highest Commodity</p>
            <div class="commodityPrice">
                <div class="ItemCity">
                    <div class="item">${highestPriceRecord.commodity}</div>
                    <div class="city">${highestPriceRecord.state} (${highestPriceRecord.market})</div>
                </div>
                <div class="price">
                    <div class="max">
                        <p class="maxPrice">MAX PRICE</p>
                        <p>${highestPriceRecord.max_price} INR</p>
                    </div>
                    <div class="min">
                        <p class="maxPrice">MIN PRICE</p>
                        <p>${highestPriceRecord.min_price} INR</p>
                    </div>
                </div>
            </div>
        </div>
        <br>
    `;

            // Insert the generated HTML into the <div id="highest"> element
            const highestElement = document.getElementById("highest");
            highestElement.innerHTML = highestPriceHtml;
        }
   

        // lowest price 
        // Find the record with the lowest price
let lowestPriceRecord = null;
let lowestPrice = Number.POSITIVE_INFINITY;

records.forEach(record => {
    if (record.min_price < lowestPrice) {
        lowestPrice = record.min_price;
        lowestPriceRecord = record;
    }
});

// Create HTML for the lowest price commodity
if (lowestPriceRecord) {
    let lowestPriceHtml = `
        <div class="lowest">
            <p>Today's Lowest Commodity</p>
            <div class="commodityPrice">
                <div class="ItemCity">
                    <div class="item">${lowestPriceRecord.commodity}</div>
                    <div class="city">${lowestPriceRecord.state} (${lowestPriceRecord.market})</div>
                </div>
                <div class="price">
                    <div class="max">
                        <p class="maxPrice">MAX PRICE</p>
                        <p>${lowestPriceRecord.max_price} INR</p>
                    </div>
                    <div class="min">
                        <p class="maxPrice">MIN PRICE</p>
                        <p>${lowestPriceRecord.min_price} INR</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert the generated HTML into the <div id="lowest"> element
    const lowestElement = document.getElementById("lowest");
    lowestElement.innerHTML = lowestPriceHtml;
}



    })