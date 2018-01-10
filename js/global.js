$(function( $ )
{
    $('#formNewsletterEmailAddress').validate({ // initialize the plugin
        rules:
        {
            emailAddress:
            {
                required: true,
                email: true,
                maxlength: 200,
                remote:
                {
                    url: "/action/newsletter_email_address",
                    type: "get",
                    data:
                    {
                        checkEmailAddress: 1,
                        email: function()
                        {
                            return $( "#txtNewsletterEmailAddress" ).val();
                        }
                    }
                }
            }
        },
        messages:
        {
            emailAddress:
            {
                remote: "&nbsp;<i class='uk-icon-exclamation-circle'></i>&nbsp;Email address already exists"
            }
        },
        errorClass: "jquery-validation-error",
        validClass: "jquery-validation-valid",
        errorPlacement: function(label, element)
        {
            if(element.attr("name") === "emailAddress")
            {
                label.insertAfter("#btnSubmitNea");
            }
            else
            {
                label.insertAfter(element); // standard behaviour
            }
        },
        submitHandler: function(form)
        {
            // Create parameters for query string
            var params = {submitNewsletterEmailAddressForm: 1};
            // Create a serialized representation of an array
            var urlParams = jQuery.param(params);
            // Create action URL address
            var urlAddress = "/action/newsletter_email_address?" + urlParams;
            // AJAX call
            ajaxFormPostSend($(form).attr("id"), urlAddress, cbFormNewsletterEmailAddress);
        }
    });

    $.extend($.validator.messages,
        {
            required: "<i class='uk-icon-exclamation-circle'></i>&nbsp;"
        }
    );



    $.cookieCuttr({
        cookieAnalytics: false,
        cookieMessage: 'We use cookies on this website, you can <a href="{{cookiePolicyLink}}" title="read about our cookies">' +'read about them here</a>. To use the website as intended please...',
        cookiePolicyLink: '/privacy_and_cookie_policy'
    });

    // Handles header's size calculate button click
    $(document).on("click", "#btnScHeaderCalculate", function()
    {
        // Submit form
        $("#formSizeCalculatorHeader").submit();
    });

    // Handles header's size chart change event
    $(document).on("click", "#formSizeCalculatorHeader input[name='sizeChartId']", function()
    {
        // Get form element
        var formElem =  $("#formSizeCalculatorHeader");
        // Get size chart ID value
        var sizeChartId = $(formElem).find("input[name='sizeChartId']:checked").val();
        // Create parameters for query string
        var params = {fetchSizeChart : 1, sizeChartId: sizeChartId};
        // Create a serialized representation of an array
        var urlParams = jQuery.param(params);
        // Create URL
        var url = "/action/size_chart?" + urlParams;

        // Make ajax call
        ajaxSendWithQueryString(url, cbFetchSizeChart, formElem);
    });

    // Handles header size calculator link click
    $(document).on("click", "#lnkHeaderSizeCalculator", function()
    {
        // Create parameters for query string
        var params = {fetchHeaderSizeCalculatorHtml : 1};
        // Create a serialized representation of an array
        var urlParams = jQuery.param(params);
        // Create URL
        var url = "/action/header?" + urlParams;

        // Make ajax call
        ajaxSendWithQueryString(url, cbFetchHeaderSizeCalculatorHtml, null);
    });

    // Handles header retailer login link click
    $(document).on("click", "#lnkDisplayHeaderSearch", function()
    {
        // Get div element
        var divElem = $("#divHeaderSearch");

        // Check if element is visible
        if($(divElem).is(":visible"))
        {
            // Fade out element
            $(divElem).fadeOut();
        }
        else
        {
            /* Element is not visible, fetch data */

            // Fetch HTML
            fetchHeaderSearchHtml(cbFetchHeaderSearchHtml);
        }
    });

    // Handles display header search mobile link click
    $(document).on("click", "#lnkDisplayHeaderSearchMobile", function()
    {
        // Check if item menu item is expanded
        var isExpanded = $(this).closest('li').hasClass('uk-open');

        // Check if element is visible
        if(isExpanded)
        {
            // Fetch HTML
            fetchHeaderSearchHtml(cbFetchHeaderSearchMobileHtml);
        }
    });

    // Handles header retailer login link click
    $(document).on("click", "#lnkHeaderRetailerLogin", function()
    {
        // Display spinner
        $("#iHrSpinner").fadeIn();
        // Display login controls
        displayRetailerLoginHtml();
    });

    // Handles popup's accept button click
    $(document).on("click", ".btnPopupAccept", function()
    {
        // Get discount coupon ID value
        var discountCouponId = $(this).siblings("input[name='discountCouponId']").val();
        // Hide popup and redirect to page
        hideAndRedirect(discountCouponId);
    });

    // Handles popup's 'Show all discounts' button click
    $(document).on("click", ".btnPopupShowDiscounts", function()
    {
        // Hide popup and redirect to page
        hideAndShowAll();
    });

    // Handles popup's 'Dismiss' button click
    $(document).on("click", ".btnPopupDismiss", function()
    {
        // Dismiss offer
        hidePopup();
        // Get modal
        var modal = UIkit.modal("#divDisplayPopup");
        // Fade out modal
        modal.hide();
    });

    // Handles header retailer login link click
    $(document).on("click", "#lnkHeaderUserLogin", function()
    {
        displayUserLoginHtml();
    });

	$("div.popup .close").click(function() {
		$(this).parent().fadeOut();
	});

    $(document).on("click", "#lnkClosePopup", function()
    {
        hidePopup();
    });

    $("#ddlLanguages").find("li").click(function()
    {
        switchLanguage($(this));
    });

    $("#ddlLanguagesMobile").find("li").click(function()
    {
        switchLanguage($(this));
    });

    // Handles mobile header search form reset button click
    $(document).on("click", "#btnHeaderSearchResetMobile", function()
    {
        // Reset all form fields
        $('#formHeaderSearchMobile').trigger("reset");
    });

    // Handles header search form reset button click
    $(document).on("click", "#btnHeaderSearchReset", function()
    {
        // Reset all form fields
        $('#formHeaderSearch').trigger("reset");
    });

    setTimeout(checkForDiscountPopupDisplay, 5000);
});

// Fetches header search html
function fetchHeaderSearchHtml(cbFunction)
{
    // Create parameters for query string
    var params = {fetchHeaderSearchHtml : 1};
    // Create a serialized representation of an array
    var urlParams = jQuery.param(params);
    // Create URL
    var url = "/action/header?" + urlParams;

    // Make ajax call
    ajaxSendWithQueryString(url, cbFunction, null);
}

// Validates page with jQuery validation plugin
function validateHeaderLoginControls()
{
    $('#formHeaderLogin').validate({ // initialize the plugin
        rules:
        {
            headerUsername:
            {
                required: true
            },
            headerPassword:
            {
                required: true
            }
        },
        errorClass: "jquery-validation-error",
        validClass: "jquery-validation-valid",
        errorPlacement: function( label, element )
        {
            if(element.attr("name") === "retailerShopName")
                label.insertAfter("#spanRetailerUserError");
            else
                label.insertAfter(element); // standard behaviour
        },
        submitHandler: function(form)
        {
            // Create parameters for query string
            var params = {logInUserFromHeader: 1};
            // Create a serialized representation of an array
            var urlParams = jQuery.param(params);
            // Create action URL address
            var urlAddress = "/action/login?" + urlParams;
            // AJAX call
            ajaxFormPostSend($(form).attr("id"), urlAddress, cbFormHeaderLogin);
        }
    });

    $.extend($.validator.messages,
        {
            required: "<i class='uk-icon-exclamation-circle'></i>&nbsp;"
        }
    );
}

// Displays header retailer login HTML
function displayRetailerLoginHtml()
{
    // Create parameters for query string
    var params = {fetchHeaderLoginHtml : 1, isRetailerLogin: 1};
    // Create a serialized representation of an array
    var urlParams = jQuery.param(params);
    // Create URL
    var url = "/action/login?" + urlParams;

    // Make ajax call
    ajaxSendWithQueryString(url, cbDisplayHeaderLoginHtml, null);
}

// Displays header user login HTML
function displayUserLoginHtml()
{
    // Create parameters for query string
    var params = {fetchHeaderLoginHtml : 1, isRetailerLogin: 0};
    // Create a serialized representation of an array
    var urlParams = jQuery.param(params);
    // Create URL
    var url = "/action/login?" + urlParams;

    // Make ajax call
    ajaxSendWithQueryString(url, cbDisplayHeaderLoginHtml, null);
}

function switchLanguage(elem)
{
    // Get URL href value
    var url = window.location.href;

    // Check if '?' exists inside of an URL
    if(url.indexOf('?') != -1)
    {
        // Get index of 'l='
        var startIndex = url.indexOf('l=');

        // Replace current language value with a new one.
        if(startIndex != -1)
            url = url.replace(url.substr(startIndex, 7), "l=" + elem.find("a").attr('name'));
        else
            url += "&l=" + elem.find("a").attr('name');
    }
    else
        url += "?l=" + elem.find("a").attr('name');

    // Redirect to new url
    window.location.href = url;
}

// Checks whether the discount popup window should appear
function checkForDiscountPopupDisplay()
{
    // Create parameters for query string
    var params = {checkPopup : 1};
    // Create a serialized representation of an array
    var urlParams = jQuery.param(params);
    // Create URL
    var url = "action/discount_popup?" + urlParams;

    // Make ajax call
    ajaxSendWithQueryString(url, cbCheckForDiscountPopupDisplay, null);
}

function showPopup()
{
    $("#lnkDisplayPopup").click();
}

function hidePopup()
{
    var url = "action/discount_popup?hidePopup=1";

    $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        timeout: 10000
    });
}

// Hides popup and redirects to coupon page
function hideAndRedirect(discountCouponId)
{
    // Get URL
    var url = "action/discount_popup?hidePopup=1";

    $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        timeout: 10000,
        success: function()
        {
            window.location.replace("/discount-products?discountCouponId=" + discountCouponId);
        }
    });
}

// Hides popup and redirects to discount-coupons page
function hideAndShowAll()
{
    var url = "action/discount_popup?hidePopup=1";

    $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        timeout: 10000,
        success: function()
        {
            window.location.replace("/discount-vouchers");
        }
    });
}

function cbCheckForDiscountPopupDisplay(responseText)
{
    if(responseText == "true")
    {
        showPopup();
    }
}

// Callback function for displaying header login HTML
function cbDisplayHeaderLoginHtml(responseData)
{
    // Display spinner
    $("#iHrSpinner").fadeOut();

    // Check for null references and error value
    if(responseData !== undefined || responseData !== '')
    {
        // Get table element
        var divElem = $("#divHeaderLoginForm");
        // Slowly hide element
        divElem.fadeOut('slow', function()
        {
            // Set html
            $(this).html(responseData);
            // Fade in element
            $(this).fadeIn();
            // Validate controls
            validateHeaderLoginControls();
        });
    }
}

// Callback function for submitting header login form
function cbFormHeaderLogin(responseData)
{
    // Parse JSON response object
    var arrResult = JSON.parse(responseData);
    // Check for null references
    if(arrResult !== undefined)
    {
        // Check if login successful
        if(arrResult['loginSuccessful'] === 1)
        {
            // Check if profile is valid (if valid it must be retailer profile)
            if(arrResult['isValidProfile'] === 1)
            {
                // Redirect user to profile page
                window.location.replace("/collection");
                return true;
            }
            else
            {
                // Check if retailer login
                if(arrResult['loginType'] === 0)
                {
                    // Redirect user to welcome page
                    window.location.replace("/retailer-welcome");
                    return true;
                }
                else
                {
                    // Redirect user to profile page
                    window.location.replace("/");
                    return true;
                }
            }
        }
        else
        {
            // Notify user
            notify(arrResult['errorMessage'], false);

            // Check if retailer login
            if(arrResult['loginType'] === 0)
            {
                displayRetailerLoginHtml();
            }
            else
            {
                displayUserLoginHtml();
            }

            return true;
        }
    }
    else
    {
        // Notify user
        notify("There was an error while trying to log in.", false);
        return null;
    }
}

// Callback function for submitting newsletter email address form
function cbFormNewsletterEmailAddress(responseData)
{
    // Parse JSON response object
    var result = JSON.parse(responseData);

    // Check result
    if(result !== undefined && result && $.isNumeric(result))
    {
        // Notify user
        notify("You successfully signed up for all the latest fashion news and exclusive offers!", true);
        return true;
    }
    else
    {
        // Notify user
        notify("There was an error while submitting form.", false);
        return null;
    }
}

// UIKit notify wrapper function
function notify(text, isSuccessMessage)
{
    if(isSuccessMessage)
    {
        $(function(){
            $.UIkit.notify({
                message : "<i class='uk-icon-check'></i>&nbsp;" + text,
                status:'success',
                timeout : 1500,
                pos     : 'top-center'
            });
        });
    }
    else
    {
        $(function(){
            $.UIkit.notify({
                message : "<i class='uk-icon-times-circle'></i>&nbsp;" + text,
                status:'danger',
                timeout : 1500,
                pos     : 'top-center'
            });
        });
    }
}

function formValid(cur)
{
    var valid = true;

    $(cur).find("input").each(function()
    {
        if (!$(this).is(":visible"))
            return;

        if ($(this).hasClass('optional'))
            return;

        if( !$(this).val() )
        {
            $(this).addClass('invalid');
            valid = false;
        } else {
            $(this).removeClass('invalid');
        }
    });
    return valid;
}

// Callback function for fetching header search HTML code
function cbFetchHeaderSearchHtml(responseData)
{
    // Check for null references and error value
    if(responseData !== undefined || responseData !== '')
    {
        // Get header search DIV element
        var divHeaderSearch = $("#divHeaderSearch");
        // Get table element
        var divDataElem = $("#divHeaderSearchData");

        // Set html
        $(divDataElem).html(responseData);
        // Fade in element
        $(divHeaderSearch).fadeIn();

        // Scroll to element
        UIkit.Utils.scrollToElement(UIkit.$("#divHeaderSearchContainer"), { offset: 90 });
    }
}

// Callback function for fetching header search HTML code
function cbFetchHeaderSearchMobileHtml(responseData)
{
    // Check for null references and error value
    if(responseData !== undefined || responseData !== '')
    {
        // Get table element
        var divDataElem = $("#divHeaderSearchMobileData");
        // Set html
        $(divDataElem).html(responseData);

        var liElem = $(divDataElem).closest('li');
    }
}

// Callback function for fetching header size calculator HTML code
function cbFetchHeaderSizeCalculatorHtml(responseData)
{
    // Check for null references and error value
    if(responseData === undefined || responseData === '')
    {
        notify("There was an error while trying to open size calculator.", false);
    }
    else
    {
        // Get table element
        var divElem = $("#divScHeaderForm");
        // Set html
        $(divElem).html(responseData);

        // Get modal element
        var modalElem = UIkit.modal("#divSizeCalcHeaderModal");
        // Show modal element
        modalElem.show();
    }
}

// Callback function for fetching size chart
function cbFetchSizeChart(responseData, formElem)
{
    // Parse JSON response object
    var arrRangeValue = JSON.parse(responseData);
    // Check for null references
    if(arrRangeValue === undefined || !arrRangeValue)
    {
        // Notify user
        notify("Error while adding items to shopping bag.", false);
    }
    else
    {
        // Set bust minimum value
        $(formElem).find("input[name='bustMinValue']").val(arrRangeValue['bustMinValue']);
        // Set bust maximum value
        $(formElem).find("input[name='bustMaxValue']").val(arrRangeValue['bustMaxValue']);
        // Set waist minimum value
        $(formElem).find("input[name='waistMinValue']").val(arrRangeValue['waistMinValue']);
        // Set waist maximum value
        $(formElem).find("input[name='waistMaxValue']").val(arrRangeValue['waistMaxValue']);
        // Set hips minimum value
        $(formElem).find("input[name='hipsMinValue']").val(arrRangeValue['hipsMinValue']);
        // Set hips maximum value
        $(formElem).find("input[name='hipsMaxValue']").val(arrRangeValue['hipsMaxValue']);
    }
}
