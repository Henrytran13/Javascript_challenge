// from data.js
var tableData = data;

// Identify the table and tbody
var tbody = d3.select('#ufo-tbody');
console.log(tbody);

// Create function to generate and populate the table
function buildTable(tableData){

    // Dynamically build table
    tableData.forEach(record => {
        var row = tbody.append('tr');

            console.log(row);
            row.append('td').text(record['datetime']);
            row.append('td').text(record['city']);
            row.append('td').text(record['state']);
            row.append('td').text(record['country']);
            row.append('td').text(record['shape']);
            row.append('td').text(record['durationMinutes']);
            row.append('td').text(record['comment']);

            
            // what else?
    })
    console.log(tableData);
}

function filterTable(){
    // Create a copy of tableData specifically for filtering
    var filteredData = tableData;

    // capture value for all search fields */
    var date = d3.select('#datetime').property('value');
    var city = d3.select('#city').property('value');
    var state = d3.select('#state').property('value');
    var country = d3.select('#country').property('value');
    var shape = d3.select('#shape').property('value');

    // what else?
    console.log(date, city, state, country, shape);

    // Build an object of fields to run through 
    var filterFields = {
        'datetime': date,
        'city': city,
        'state': state,
        'country': country,
        'shape': shape
        // think about how we should populate this and why
    }
    
   // Remove empty keys from the list of filters to search
    Object.entries(filterFields).forEach(([key, val]) => {
        
        // Use !val to check for empty strings or nulls
        if(!val) { 
            delete filterFields[key];
        }
    });
    console.log(filterFields);

    // Loop through each of the filter keys and return records from filteredData that match 
    Object.entries(filterFields).forEach(([key, value]) => {
        // Continue to refine the filteredData array 
        filteredData = filteredData.filter(row => row[key] == value);
        // if the line above works, think about why!!
        console.log(filteredData);
      });    

    // Clear out the tbody
    tbody.html('');

    // Rebuild the filtered table using the buildTable function 
    buildTable(filteredData);    
}

// Identify web elements on the page
btn = d3.select('#filter-btn');
datetimefield = d3.select('#datetime');
btn.on('click', filterTable);
datetimefield.on('change', filterTable);

// Attach an event listener to the fields attached to the .filter class 
// your-code here
d3.selectAll('.filter').on('change', filterTable);

// Call the function to initially load the table and pass the tableData to that function
buildTable(tableData);