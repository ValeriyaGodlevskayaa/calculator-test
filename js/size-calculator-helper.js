// Validates size calculator form
function validateSizeCalculator(formId)
{
    // Validate header's size calculator form
    $('#' + formId).validate({ // initialize the plugin
        rules:
        {
            bust:
                {
                    required: true,
                    number: true,
                    min: function()
                    {
                        // Get value from hidden input
                        var value = Number($("input[name='bustMinValue']").val());

                        // Check if measurement is in inches
                        if(Number($("input[name='measurementUnitEnum']:checked").val()) === 2)
                        {
                            return value / 2.5;
                        }

                        return value;
                    },
                    max: function()
                    {
                        // Get value from hidden input
                        var value = Number($("input[name='bustMaxValue']").val());

                        // Check if measurement is in inches
                        if(Number($("input[name='measurementUnitEnum']:checked").val()) === 2)
                        {
                            return value / 2.54;
                        }

                        return value;
                    }
                },
            waist:
                {
                    required: true,
                    number: true,
                    min: function()
                    {
                        // Get value from hidden input
                        var value = Number($("input[name='waistMinValue']").val());

                        // Check if measurement is in inches
                        if(Number($("input[name='measurementUnitEnum']:checked").val()) === 2)
                        {
                            return value / 2.54;
                        }

                        return value;
                    },
                    max: function()
                    {
                        // Get value from hidden input
                        var value = Number($("input[name='waistMaxValue']").val());

                        // Check if measurement is in inches
                        if(Number($("input[name='measurementUnitEnum']:checked").val()) === 2)
                        {
                            return value / 2.54;
                        }

                        return value;
                    }
                },
            hips:
                {
                    required: true,
                    number: true,
                    min: function()
                    {
                        // Get value from hidden input
                        var value = Number($("input[name='hipsMinValue']").val());

                        // Check if measurement is in inches
                        if(Number($("input[name='measurementUnitEnum']:checked").val()) === 2)
                        {
                            return value / 2.5;
                        }

                        return value;
                    },
                    max: function()
                    {
                        // Get value from hidden input
                        var value = Number($("input[name='hipsMaxValue']").val());

                        // Check if measurement is in inches
                        if(Number($("input[name='measurementUnitEnum']:checked").val()) === 2)
                        {
                            return value / 2.5;
                        }

                        return value;
                    }
                }
        },
        messages :
        {
            bust :
                {
                    number: "&nbsp;<i class='uk-icon-exclamation-circle'></i> digits only",
                    remote: "&nbsp;<i class='uk-icon-exclamation-circle'></i> invalid number range"
                },
            waist :
                {
                    number: "&nbsp;<i class='uk-icon-exclamation-circle'></i> digits only",
                    remote: "&nbsp;<i class='uk-icon-exclamation-circle'></i> invalid number range"
                },
            hips :
                {
                    number: "&nbsp;<i class='uk-icon-exclamation-circle'></i> digits only",
                    remote: "&nbsp;<i class='uk-icon-exclamation-circle'></i> invalid number range"
                }
        },
        errorClass: "jquery-validation-error",
        validClass: "jquery-validation-valid",
        submitHandler: function(form)
        {
            // Create parameters for query string
            var params = {submitSizeCalculatorForm: 1};
            // Create a serialized representation of an array
            var urlParams = jQuery.param(params);
            // Create action URL address
            var urlAddress = "/action/size_chart?" + urlParams;
            // AJAX call
            ajaxFormPostSend($(form).attr("id"), urlAddress, cbFormSizeCalculator);
        }
    });

    $.extend($.validator.messages,
        {
            required: "&nbsp;<i class='uk-icon-exclamation-circle'></i>&nbsp;Required"
        }
    );
}