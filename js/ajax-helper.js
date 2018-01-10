/**
 * Created by Dragutin Miletic on 2014-03-08
 */

function showWaitScreen(elementId)
{
    var screenHeight = jQuery(document).height();
    jQuery('#' + elementId).css('height', screenHeight).show();
}

function hideWaitScreen(elementId)
{
    jQuery('#' + elementId).hide();
}

// Execute AJAX request by serializing form data.
function ajaxFormGetSend(formId, url, cfunc, waitElementId)
{
    // Serialize form data
    var data = jQuery('#' + formId).serialize();
    // Show wait screen
    showWaitScreen(waitElementId);

    $.ajax({
        type: 'GET',
        url: url,
        data: data,
        cache: false,
        timeout: 10000,
        success: function(text)
        {
            // Hide wait screen
            hideWaitScreen(waitElementId);
            // Execute callback function
            cfunc(text);
        }
    });

    return false;
}

// Execute AJAX request by serializing form data.
function ajaxFormPostSend(formId, url, cfunc, waitElementId)
{
    // Serialize form data
    var data = jQuery('#' + formId).serializeArray();
    // Show wait screen
    showWaitScreen(waitElementId);

    jQuery.ajax({
        type: 'POST',
        url: url,
        data: data,
        cache: false,
        timeout: 10000,
        success: function(text)
        {
            // Hide wait screen
            hideWaitScreen(waitElementId);
            // Execute callback function
            cfunc(text);
        }
    });

    return false;
}

// Execute AJAX request by serializing form data.
function ajaxFormPostSendWoWaitElement(formId, url, cfunc)
{
    // Serialize form data
    var data = jQuery('#' + formId).serializeArray();

    jQuery.ajax({
        type: 'POST',
        url: url,
        data: data,
        cache: false,
        timeout: 10000,
        success: function(text)
        {
            // Execute callback function
            cfunc(text);
        }
    });

    return false;
}

// Execute AJAX request by serializing form data.
function ajaxFormPostSendWoWaitElementJson(formId, url, cbFuncSuccess, cbFuncFailure)
{
    // Serialize form data
    var data = jQuery('#' + formId).serializeArray();

    jQuery.ajax({
        type: 'POST',
        url: url,
        dataType: 'JSON',
        data: data,
        cache: false,
        timeout: 10000,
        success: function(text)
        {
            if (text == 'true') {
                cbFuncSuccess();
            } else {
                cbFuncFailure();
            }
        }
    });
}

// Execute AJAX request by serializing form data without callback function
function ajaxFormPostSendWoCfunc(formId, url)
{
    // Serialize form data
    var data = $('#' + formId).serializeArray();
    // Show wait screen

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        cache: false,
        timeout: 10000
    });

    return false;
}

// Execute AJAX request by by sending data through URL
function ajaxSendWithQueryString(url, cfunc, elem)
{
    $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        timeout: 10000,
        success: function(text)
        {
            // Execute callback function
            if(cfunc !== null)
            {
                // Hide wait screen
                if(elem !== null)
                {
                    cfunc(text, elem);
                }
                else
                {
                    cfunc(text);
                }
            }
        }
    });

    return false;
}

// Execute AJAX request by sending data through URL
// This function passes array of parameters to callback function.
function ajaxSendWithParamsArray(url, groupId, cfunc, arrCfuncParameters, doResponse, waitElementId)
{
    // Show wait screen
    showWaitScreen(waitElementId);

    $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        timeout: 10000,
        success: function(text)
        {
            // Hide wait screen
            hideWaitScreen(waitElementId);

            // Check whether response variable is required.
            if(doResponse)
                cfunc(text, groupId, arrCfuncParameters);
            else
                cfunc(groupId, arrCfuncParameters);
        }
    });
}

