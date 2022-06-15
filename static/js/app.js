//url with data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function that contains instructions at page load/refresh
// create dropdown/select
// run functions to generate plots
function init(){
    // Fetch the JSON data and console log it in the console
    d3.json(url).then(function(data) {
        //check that data was retrieved, examine data
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
        
        // create variables for plots with data from chosen sample
        let chosenSample = data.samples.filter(function (sample) {
            return sample.id == id;
            })[0];
        let otuIDs = chosenSample.otu_ids;
        let sampleValues = chosenSample.sample_values;
        let otuLabels = chosenSample.otu_labels;
        
        //create variables for bar chart
        //top ten otu IDs for plot and reverse for descending order
        let toptenotus = (otuIDs.slice(0, 10)).reverse();
        // top ten otu IDs into plot format
        let toptenotuIDs = toptenotus.map(f =>"OTU" + f);
        //top ten labels for plot
        let toptenlabels = otuLabels.slice(0, 10);
        ///// horizontal bar chart
        let trace1 = {
         x: sampleValues,
         y: toptenotuIDs,
         text: toptenlabels,
         marker: {
            color: 'rgba(42, 186, 207, 0.61)',
            width: 1
            },
            type: "bar",
            orientation: "h"
        };
        // turn data into an array for Plotly
        let hbarData = [trace1];
        // Apply a title to the layout
         layout = {
         title: "Top Ten OTUs for Test Subject",
         };
       // Render the plot to the div tag with id "plot"
       Plotly.newPlot("bar", hbarData, layout);
    
        ///// bubble chart
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
         height: 600,
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", bubbleData, layout);

    }); 
} //end plot function

/// function to add info to summary data card
function createSummary(id){
    // function to access html
    function buildMetadata(metadataToShow) {
        let panel = d3.select("#sample-metadata");
        //clear the metadata if new ID is chosen
        panel.html("");
        // format key and value to display on card
        Object.entries(metadataToShow).forEach(([key, value])=>{
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        }); 
    }
    // code that makes list, paragraph, text/linebreaks at id='sample-meta'
    // Fetch the JSON data
    d3.json(url).then(function(data) {
        let summarydata = data.metadata;
        // filter key, values for chosen ID
        let matchingMetadatArray = summarydata.filter(function (person) {
            return person.id == id;
            });
        let matchingMetadata = matchingMetadatArray[0];
        // call function to fill card with info
        buildMetadata(matchingMetadata);
    });
} //end summary function

///function that runs whenever the dropdown is changed
function optionChanged(newID){
    // call functions to update the charts based on the option chosen
    createPlots(newID);
    createSummary(newID);
} //end optionchanged function

// function called, runs init instructions
// runs only on load and refresh of browser page
init();





