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
    
    //shirt
    $('#design').click((elem) => {
        let selectedDesign = $('#design').val();
        console.log(selectedDesign);
        if ( selectedDesign === "js puns") {
            $('#color option').hide();
            $('#color option:contains("JS Puns")').show();
        } else {
            
        }
    });
    
});