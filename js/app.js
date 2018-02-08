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
    //THIS REQUEST IS CONFUSING SINCE YOU HAVE TO CREATE IT DYNAMICALLY, BUT THEN IN STEP 8 IT STATES THAT THE FIELD NEEDS TO BE SHOWN EVEN WITHOUT JS - SHOW ADDING THE FIELD IN THE HTML INSTEAD AND HIDING/SHOWING HERE
   //HIDE THE FIELD TO START -- STEP 7
   $('#other-title').hide();
   $('#title').change((elem) => {
        //get selec ted job value
        let selectedJob = $('#title').val();
        //if it is not visible append the html for the input -- UPDATED TO SHOW FOR STEP 8
        if (selectedJob === 'other') {
            $('#other-title').show();
        }
        //if the field is currently visible - check to make sure job role is still other
        else {
            //if the job role is not other - remove the unnecessary input field -- UPDATED TO HIDE FOR STEP 8
            $('#other-title').hide();
        }
    });
    
    
    //////////////////////////////////STEP THREE + EXCEEDS STEP ONE//////////////////////////////////
    //Adding classes to match the colors to the theme - adding based on what is in the () in case extra colors are added
    $('#color option:contains("JS Puns")').addClass('jsPuns');
    $('#color option').not(':contains("JS Puns")').addClass('iheart');
    //Hide the color label and select menu until a theme is chosen
    $('#colors-js-puns').hide();
    //shirt choice - show only available shirt colors for the chosen theme/design
    $('#design').change((elem) => {
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
    //hide "select payment" option if credit card is shown on default per requirements (seems unecessary to leave it)
    $('#payment option[value="select_method"]').hide();
    
    //check to see what is selected and show matching payment div
    $('#payment').change((event) => {
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
    
    //////////////////STEP SIX + EXCEEDS STEP TWO AND THREE/////////////////////
    
    //validate name function
    const validateName = () => {
        //remove any previous error messages
        $('.nameVal').remove();
        //get the input value for the name
        let nameVal = $('#name').val();
        //if it is empty - tell user to input name and disabled the submit button
        if ( nameVal === "") {
            $('#name').css('border-color', 'red').attr('placeholder', 'Please Enter Your Name');
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        //if the input is a number and not a name - place an error message and disabled button
        } else if ( !isNaN(nameVal) ) {
            $('#name').css('border-color', 'red');
            $('#name').after('<p class="nameVal">Please enter a name using letters.</p>');
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        //if the value is text then make sure the border is the correct color and make button accessible
        } else if ( isNaN(nameVal) ) {
            $('#name').css('border-color', '#5e97b0');
            $('button').prop('disabled', false).css('cursor', 'default');
        }
    }
    
    //check the name after a key is pressed and if they tab out or move to another section
    $('#name').keyup(validateName).focusout(validateName);
    
    //validate email function
    const validateEmail = () => {
        //remove any previous error messages
        $('.emailVal').remove();
        //get the email input value
        let emailVal = $('#mail').val();
        //regex to test against - from emailregex.com
        let test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //if nothing is entered - let use know they need to enter an email
        if( emailVal === '') {
            $('#mail').css('border-color', 'red').attr('placeholder', 'Please Enter Your Email');
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        }
        //if the email is valid - form submission is possible and field returns to normal state
        else if ( test.test(emailVal) ) {
            $('#mail').css('border-color', '#5e97b0');
            $('button').prop('disabled', false).css('cursor', 'default');
        //if email is not valid - form cannot be submitted and user is informed to enter a valid email
        } else if ( !test.test(emailVal) ){
            $('#mail').css('border-color', 'red');
            $('#mail').after('<p class="emailVal">Please enter a valid email.</p>');
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        }
    }
    
    $('#mail').keyup(validateEmail).focusout(validateEmail);
    
    //must choose at least one event validation
    const validateEvents = () => {
        //remove any previous error messages
        $('.eventsVal').remove();
        //create a list of checked events
        let checkedEvents = [];
        //add checked events items to the array
        $('.activities input:checked').each(() => {
            checkedEvents.push($(this).text());
        });
        //if there are no checked events, then inform user to chose and event and turn the title red
        if (checkedEvents.length < 1) {
            $('.activities legend').css('color', 'red');
            $('.activities').after('<p class="eventsVal">Please choose at least one event.</p>');
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        //if more than one events is chosen, then remove error messages and make sure the colors stay the same
        } else {
            $('button').prop('disabled', false).css('cursor', 'default');
            $('.activities legend').css('color', '#184f68');
        }
    }
    //call validation on change
    $('.activities').change(() => {
        validateEvents();
    });
    
    //credit card validation
    //credit card number - must be numbers - must be between 13 & 16 numbers long
    const validateCC = () => {
        //remove any previous error messages
        $('.ccVal').remove();
        //reset the field back to normal
        $('#cc-num').css('border-color', '#5e97b0');
        //make the button accessible
        $('button').prop('disabled', false).css('cursor', 'default');
        //get the credit card number value
        let ccVal = $('#cc-num').val();
        //if the input is only numbers then check the length
        if (!isNaN(ccVal) && ccVal != ''){
            //split the numbers to get an array and check the length
            let numbers = ccVal.split('');
            //if the length is not correct, then let the user know
            if ( numbers.length < 13 || numbers.length > 16) {
                $('#cc-num').css('border-color', 'red');
                $('#cc-num').after(`<p class="ccVal">Credit Card must have at least 13 numbers and no more than 16 numbers.</p>`);
                $('button').prop('disabled', true).css('cursor', 'not-allowed');
            }
        //if the input is not a number, then let the user know
        } else if (ccVal === '') {
            $('#cc-num').css('border-color', 'red');
            $('#cc-num').after(`<p class="ccVal">Please enter a credit card number.</p>`);
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        } else {
            $('#cc-num').css('border-color', 'red');
            $('#cc-num').after(`<p class="ccVal">Please enter only numbers.</p>`);
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        }
    }
    //call the validate function
    $('#cc-num').keyup(validateCC).focusout(validateCC);
    
    //zipcode - must be a number - must be 5 numbers long
    const validateZip = () => {
        //remove any previous error messages
        $('.zipVal').remove();
        //reset the field back to normal
        $('#zip').css('border-color', '#5e97b0');
        //make the button accessible
        $('button').prop('disabled', false).css('cursor', 'default');
        //get the zip code value
        let zipVal = $('#zip').val();
        //if the input is only numbers then check the length
        if (!isNaN(zipVal) && zipVal != ''){
            //split the numbers to get an array and check the length
            let numbers = zipVal.split('');
            //if the length is not correct, then let the user know
            if ( numbers.length != 5) {
                $('#zip').css('border-color', 'red');
                $('#zip').after(`<p class="zipVal">Zip Code must be 5 numbers long.</p>`);
                $('button').prop('disabled', true).css('cursor', 'not-allowed');
            }
        //if the input is not a number, then let the user know
        } else if (zipVal === ''){
            $('#zip').css('border-color', 'red');
            $('#zip').after(`<p class="zipVal">Please enter a zip code.</p>`);
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        } else {
            $('#zip').css('border-color', 'red');
            $('#zip').after(`<p class="zipVal">Please enter only numbers.</p>`);
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        }
    }
    //call the validate function
    $('#zip').keyup(validateZip).focusout(validateZip);
    
    //cvv - must be a number - must be 3 numbers long
    const validateCVV = () => {
        //remove any previous error messages
        $('.cvvVal').remove();
        //reset the field back to normal
        $('#cvv').css('border-color', '#5e97b0');
        //make the button accessible
        $('button').prop('disabled', false).css('cursor', 'default');
        //get the zip code value
        let cvvVal = $('#cvv').val();
        //if the input is only numbers then check the length
        if (!isNaN(cvvVal) && cvvVal != ''){
            //split the numbers to get an array and check the length
            let numbers = cvvVal.split('');
            //if the length is not correct, then let the user know
            if ( numbers.length != 3) {
                $('#cvv').css('border-color', 'red');
                $('#cvv').after(`<p class="cvvVal">CVV must be 3 numbers long.</p>`);
                $('button').prop('disabled', true).css('cursor', 'not-allowed');
            }
        //if the input is not a number, then let the user know
        } else if (cvvVal === ''){
            $('#cvv').css('border-color', 'red');
            $('#cvv').after(`<p class="cvvVal">Please enter a CVV.</p>`);
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        } else {
            $('#cvv').css('border-color', 'red');
            $('#cvv').after(`<p class="cvvVal">Please enter only numbers.</p>`);
            $('button').prop('disabled', true).css('cursor', 'not-allowed');
        }
    }
    //call the validate function
    $('#cvv').keyup(validateCVV).focusout(validateCVV);
    
    //EXTRA - Check all validation types on form submit - make sure everything required is there before submitting
    $('button').click(() => {
        validateName();
        validateEmail();
        validateEvents();
        let selected = $('#payment option:selected').text();
        if (selected === "Credit Card" ) {
            validateCC();
            validateZip();
            validateCVV();
        }
    });
});