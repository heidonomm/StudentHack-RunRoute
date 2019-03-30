
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
            required: "Please enter a distance.",
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
    } else {
        var center = [53.4746886, -2.2334728];
        console.log(center);
        var radius = x;
        console.log(radius);
        var options = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
        console.log(options);
        console.log('I work');
        var circle = turf.circle(center, radius, options);
        console.log(circle);
        console.log(circle.geometry.coordinates);
        console.log(circle.geometry.coordinates[0][1]);
        console.log(circle.geometry.coordinates[0][2]);
    }
}

