//Start javascript when page is ready
$(document).ready(() => {
    
    
    //set focus on the name field when the apge is loaded
    document.getElementById("name").focus();
    
    
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
    
    //shirt choice - show only available shirt colors for the chosen theme/design
    $('#design').click((elem) => {
        //get the chosen design
        let selectedDesign = $('#design').val();
        //if they choose js puns - then show the js puns only shirt colors and make sure one of the options is shown in the selection box
        if ( selectedDesign === "js puns") {
            $('#color option').hide();
            $('#color option:contains("JS Puns")').show();
            $('#color').find('option[value="cornflowerblue"]').prop('selected', 'selected');
            //if they choose i heart js - then show the i heart js only shirt colors and make sure one of the options is shown in the selection box
        } else if (selectedDesign === 'heart js') {
            $('#color option').hide();
            $('#color option').not(':contains("JS Puns")').show();
            $('#color').find('option[value="tomato"]').prop('selected', 'selected');
        //if they choose nothing or change back to the generic select theme - then show all the options and make sure the first option is shown as selected in the box
        } else {
            $('#color option').show();
            $('#color').find('option[value="cornflowerblue"]').prop('selected', 'selected');
        }
    });
    
});