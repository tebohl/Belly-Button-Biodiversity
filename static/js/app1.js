//url with data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function one: contains instructions at page load/refresh
// code that runs once (only on page load or refresh)
// create dropdown/select
// run functions to generate plots
function init(){
    // Fetch the JSON data and console log it in the console
    d3.json(url).then(function(data) {
    console.log(data);
    
    // dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    //array for names, loop through array and add to drop down menu
    let patients = data.names;
    for (let i = 0; i < patients.length; i++) {
        dropdownMenu.append("option").text(patients[i]).attr("value", patients[i]);
      }
    //call functions to display plots and info for first entry on loading page
    createPlots(patients[0]);
    createSummary(patients[0]);
}); //end function with data
} //end init


///function to create plots
    function createPlots(id){
    // Fetch the JSON data
    d3.json(url).then(function(data) {
        
    // create variables for plots from data
    let otuIDs = data.samples[0].otu_ids;
    let sampleValues = data.samples[0].sample_values;
    let otuLabels = data.samples[0].otu_labels;

    //top ten otu IDs for plot and reverse for descending order
    let toptenotus = (otuIDs.slice(0, 10)).reverse();
    // top ten otu IDs into plot format
    let toptenotuIDs = toptenotus.map(f =>"OTU" + f);
    //top ten labels for plot
    let toptenlabels = otuLabels.slice(0, 10);

    // horizontal bar chart
    let trace1 = {
        x: sampleValues,
        y: toptenotuIDs,
        text: toptenlabels,
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
       Plotly.newPlot("bar", hbarData, layout);
    
    // bubble chart
        let trace2 = {
        x: otuIDs,
        y: sampleValues,
        mode: "markers",
        marker: {
         size: sampleValues,
         color: otuIDs},
         text: otuLabels
        }
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
        Plotly.newPlot("bubble", bubbleData, layout);

    });
    }

    function createSummary(id){
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    // Fetch the JSON data
    d3.json(url).then(function(data) {
    let summarydata = data.metadata;
        console.log(summarydata);

    });

}

//function that runs whenever the dropdown is changed
//this function is in the HTML and is called with an input called 'this.value'
//that comes from the select element (dropdown)

//On change to the DOM, call optionChanged()
//d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(newID){
    // Fetch the JSON data and
    d3.json(url).then(function(data) {
    // update the charts based on the option chosen
    createPlots(newID);
    createSummary(newID);
});
}

// function called, runs init instructions
// runs only on load and refresh of browser page
init();





