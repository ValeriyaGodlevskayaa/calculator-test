$(function( $ )
{
    // Add jQuery validation
    validateSizeCalculator('formSizeCalculator');

    //region ********** Event handlers **********

    // Handles product category dropdown value change
    $(document).on("change", "#ddlProductCategory", function()
    {
        // Get product category ID value
        var productCategoryId = $(this).val();
        // Create array of parameters
        var params = {fetchSmallSizeChartHtml: 1, productCategoryId: productCategoryId};
        // Create a serialized representation of an array
        var urlParams = jQuery.param(params);
        // Create URL
        var url = "/action/size_chart?" + urlParams;

        // Make ajax call
        ajaxSendWithQueryString(url, cbFetchSmallSizeChartHtml, null);
    });

    //endregion
});

//region ************* Callback functions ****************

// Callback function for submitting size calculator form
function cbFormSizeCalculator(responseData)
{
    // Check for null references and error value
    if(responseData === undefined || responseData === '')
    {
        notify("There was an error while trying to fetch size calculator result data.", false);
    }
    else
    {
        // Get DIV element
        var divElem = $("#divSizeCalculatorResult");

        // Check if div element exists
        if(divElem.length)
        {
            // Hide element
            divElem.hide();
            // Fill element with fetched HTML
            divElem.html(responseData);
            // Fade in element
            divElem.fadeIn("slow");
        }
    }
}

// Callback function for submitting size calculator form
function cbFetchSmallSizeChartHtml(responseData)
{
    // Check for null references and error value
    if(responseData === undefined || responseData === '')
    {
        notify("There was an error while trying to fetch size calculator data.", false);
    }
    else
    {
        // Get DIV element
        var divElem = $("#divSizeCalculator");

        // Check if div element exists
        if(divElem.length)
        {
            // Hide element
            divElem.hide();
            // Fill element with fetched HTML
            divElem.html(responseData);
            // Fade in element
            divElem.fadeIn("slow");
        }

        // Add jQuery validation
        validateSizeCalculator('formSizeCalculator');
    }
}

//endregion
