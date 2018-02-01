//Start javascript when page is ready
$(document).ready(() => {
    
    //////////////////////////////////STEP ONE//////////////////////////////////
    //set focus on the name field when the apge is loaded
    document.getElementById("name").focus();
    //Adding a placeholder to remind user to choose a t-shirt theme before the color options for that theme can be shown
    $('#color option').hide();
    $('#color').prepend('<option value="select"><--- Please Select a Theme</option>');
    $('#color option[value="select"]').show();
    $('#color').find('option[value="select"]').prop('selected', 'selected');
    
    
    //////////////////////////////////STEP TWO//////////////////////////////////
    //Job Role - create text field if other is chosen
    $('#title').click((elem) => {
        //get selec ted job value
        let selectedJob = $('#title').val();
        //check if the other text input field is already visible
        if( $('#other-title').attr('type') != 'text') {
            //if it is not visible append the html for the input
            if (selectedJob === 'other') {
                $('form fieldset').first().append('<input type="text" id="other-title" name="other_job" placeholder="Your Job Role">');
            }
        //if the field is currently visible - check to make sure job role is still other
        } else {
            //if the job role is not other - remove the unnecessary input field
            if (selectedJob != 'other') {
                $('#other-title').remove();
            }
        }
    });
    
    
    //////////////////////////////////STEP THREE + EXCEEDS STEP ONE//////////////////////////////////
    //Adding classes to match the colors to the theme - adding based on what is in the () in case extra colors are added
    $('#color option:contains("JS Puns")').addClass('jsPuns');
    $('#color option').not(':contains("JS Puns")').addClass('iheart');
    //Hide the color label and select menu until a theme is chosen
    $('#colors-js-puns').hide();
    //shirt choice - show only available shirt colors for the chosen theme/design
    $('#design').click((elem) => {
        //show the color label and menu
        $('#colors-js-puns').show();
        //get the chosen design
        let selectedDesign = $('#design').val();
        //hide all to start
        $('#color option').hide();
        //if they choose js puns - then show the js puns only shirt colors and make sure one of the options is shown in the selection box
        if ( selectedDesign === "js puns") {
            //remove the placeholder option
            $('#color option[value="select]').remove();
            //show the matching colors
            $('.jsPuns').show();
            //make the first one shown as the selected item
            $('#color').find('option[value="cornflowerblue"]').prop('selected', 'selected');
            // //only show the color name - remove the (JS Puns shirt only)
            $('#color option:contains("(JS Puns shirt only)")').each(function(){
                $(this).html($(this).html().split(" (JS Puns shirt only)").join(""));
            });
            //if they choose i heart js - then show the i heart js only shirt colors and make sure one of the options is shown in the selection box
        } else if (selectedDesign === 'heart js') {
            //show the color label and menu
            $('#colors-js-puns').show();
            //show the matching colors
            $('.iheart').show();
            //remove the placeholder option
            $('#color').find('option[value="select"]').remove();
            //make the first color selected
            $('#color').find('option[value="tomato"]').prop('selected', 'selected');
            //only show the color name - remove the (I heart JS shirt only)
            $('#color option').not(':contains("JS Puns")').each(function(){
                $(this).html($(this).html().split(" (")[0]);
            });
        //if they change back to the generic select theme - then hide the color menu again
        } else {
            //Hide the color label and select menu until a theme is chosen
            $('#colors-js-puns').hide();
        }
    });
    
    //////////////////////////////////STEP FOUR//////////////////////////////////
    
    //Create Sum/Total price for the chosen events - update on each change
    $('.activities').change(() => {
        //start and return the sum to zero
        let sum = 0;
        $('.activities input').each((index, element) => {
            //only add up the checked items for the total
            if ( $(element).prop('checked')) {
                //grab the text
                let text = $(element).parent().text();
                //split the text to include only the price - add it to the sum for each checked item
                sum += parseInt(text.split('$')[1]);
            }
        });
        //remove previous total
        $('#total').remove();
        //add in current total
        $('.activities').append(`<p id="total">Total: $${sum}`);
        //if nothing is selected or total is zero then remove the total
        if ( sum === 0) {
            $('#total').remove();
        }
    });
    
    //Create an array of all events on the page - this way if more events are added the functionality will still work
    let events = [];
    //iterate through the inputs and put their labels into the array to check dates against
    $('.activities input').each((index, element) => {
        let text = $(element).parent().text();
        events.push(text);
    });
    
    //disable function
    const disablePair = (date, text) => {
        //filter out for the matching dates
        let filter = events.filter(event => event.indexOf(date) >= 0 && event.indexOf(text) <0);
        //if there is a pair or more -> set disabled and change text color to grey
        if (filter.length >= 1) {
            $(`.activities label:contains(${date})`).each((index, element) => {
                let checkText = $(element).text();
                if ( checkText != text) {
                    $(`.activities label:contains(${checkText})`).css('color', 'grey').children().prop('disabled', true);
                }
            });
        }
    }
    
    //enable function
    const enablePair = (date, text) => {
        //filter out for the matching dates
        let filter = events.filter(event => event.indexOf(date) >= 0);
        //if there are matching dates
        if (filter.length >= 2) {
            //check if any of the matches are checked - if not, then enable any pairs
            if (!$(`.activities label:contains(${date})`).not(`:contains(${text})`).children().prop('checked')){
                 $(`.activities label:contains(${date})`).css('color', '#000').children().prop('disabled', false);
            }
        }
    }
    
    //watch for changes on the checkboxes
    $('.activities').change(() => {
        //test all of the items for which are checked or not checked against the enable and disabled functions
        $('.activities input').each((index, element) => {
            //get the label text
            let text = $(element).parent().text();
            //split for the date and price section
            let subString = text.split("—")[1];
            //split for the date & time
            let subDateString = subString.split(',')[0];
            //if item is checked -> see if it has a pair to be disabled
            if ( $(element).prop('checked')) {
                disablePair(subDateString, text);
            //if item is not checked, then see if a pair needs to be reenabled
            } else {
                enablePair(subDateString, text);
            }
        });
    });
    
    //////////////////////////////////STEP FIVE//////////////////////////////////
    
    //adding classes to the other payment option divs to make them easier to work with
    $('#credit-card').next().addClass('paypal');
    $('#credit-card').next().next().addClass('bitcoin');
    //hide payment divs until payment preference is chosen
    $('.paypal').hide();
    $('.bitcoin').hide();
    //show credit card for default
    $('#credit-card').show();
    $('#payment option[value="credit card"]').prop('selected', true);
    
    //check to see what is selected and show matching payment div
    $('#payment').click((event) => {
        //get the selected option
        let selected = $('#payment option:selected').text();
        //hide all in case they change payment options
        $('.paypal').hide();
        $('#credit-card').hide();
        $('.bitcoin').hide();
        //show the selected preference
        if ( selected === "Credit Card" ) {
            $('#credit-card').show();
        } else if ( selected === "PayPal" ) {
            $('.paypal').show();
        } else if ( selected === "Bitcoin" ) {
            $('.bitcoin').show();
        }
    });
    
});