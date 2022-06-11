
// function one: contains instructions at page load/refresh
// code that runs once (only on page load or refresh)
// create dropdown/select
// run functions to generate plots
function init(){
    // Fetch the JSON data and console log it
    d3.json("samples.json").then(function(sampledata) {
    console.log(sampledata);
    });

    // dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    //array for names, loop through array and add to drop down menu
    let patients = sampledata.names
    for (let i = 0; i < patients.length; i++) {
        dropdownMenu.append(patients[i]);
      }

    // create initial plots
    createBubble(patients[0])
    createBar(patients[0])
    createSummary(patients[0])

}


// function two: runs whenever the dropdown is changed
// this function is in the HTML and is called with an input called 'this.value'
// that comes from the select element (dropdown)

// On change to the DOM, call optionChanged()
d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(newID){
    // Call function to update the chart based on the option chosen
    createBubble(newID)
    createBar(newID)
    createSummary(newID)

}

////// function three thru five: create plots and summary cards ////////

function createBar(id){
    // code that makes bar chart at id='bar'

    // horizontal bar chart of top ten OTUs
    //sort data by sample values descending
    let sortedOTU = data.sort((a, b) => b.sample_values - a.sample_values);
    // slice the first 10 objects for plotting
    let toptenOTU = sortedOTU.slice(0, 10);
    // reverse the array to accommodate Plotly's defaults
    reversedData = toptenOTU.reverse();

    // trace1
    let trace1 = {
     x: reversedData.map(object => object.sample_values),
     y: reversedData.map(object => object.otu_ids),
     text: reversedData.map(object => object.otu_labels),
     type: "bar",
    orientation: "h"
    };
    // turn data into an array for Plotly
    let hbarData = [trace1];
    // Apply a title to the layout
    layout = {
    title: "Top Ten OTUs",
    margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
     }
    };
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", hbarData, layout);
    
    // checking to see if function is running
    console.log(`This function generates bar chart of ${id} `)

}


function createBubble(id){
    // code that makes scatter plot at id='bubble'
    //bubble chart of each sample
    // trace2
    let trace2 = {
    x: data.map(object => object.sample_values),
    y: data.map(object => object.otu_ids),
    mode: "markers",
    marker: {
      size: object.sample_values
    }
     };
     // turn data into an array for Plotly
     let bubbleData = [trace2];
     // Apply a title to the layout
     layout = {
     title: "OTUs by Sample",
     showlegend: false,
     height: 600,
     width: 600
    };
     // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", bubbleData, layout);

    // checking to see if function is running
    console.log(`This function generates scatter plot of ${id} `)
}


function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'

    // checking to see if function is running
    console.log(`This function generates summary info of ${id} `)
}


// function called, runs init instructions
// runs only on load and refresh of browser page
init();




