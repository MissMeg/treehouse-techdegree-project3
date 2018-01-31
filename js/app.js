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
    
    
    //////////////////////////////////STEP THREE//////////////////////////////////
    //Adding classes to match the colors to the theme - adding based on what is in the () in case extra colors are added
    $('#color option:contains("JS Puns")').addClass('jsPuns');
    $('#color option').not(':contains("JS Puns")').addClass('iheart');
    //shirt choice - show only available shirt colors for the chosen theme/design
    $('#design').click((elem) => {
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
        //if they choose nothing or change back to the generic select theme - then hide all color options again and show the prompt choice in the selection box
        } else {
            //show the placeholder option
            $('#color option[value="select"]').show();
            //make sure the placeholder is selected
            $('#color option[value="select"]').prop('selected', 'selected')
            //if the placeholder value isnt there then add it back in
            if ($('#color option').first().attr('value') != 'select') {
                $('#color').prepend('<option value="select"><--- Please Select a Theme</option>');
                $('#color').find('option[value="select"]').prop('selected', 'selected');
            }
        }
    });
    
    //////////////////////////////////STEP FOUR//////////////////////////////////
    
});