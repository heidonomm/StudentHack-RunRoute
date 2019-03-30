jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
    });
    $( "#myform" ).validate({
    rules: {
        field: {
            required: true,
            digits: true
        }
    },
    messages: {
        field: {
            required: "We need a distance.",
            digits: "You need to enter a digit."
        }
    }
    });

var distance = document.getElementById("field");
distance.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        validate(e);
    }
});


function validate(e)
{
    var x = e.target.value;

    if (isNaN(x)) 
    {
        return false;
    } 
}