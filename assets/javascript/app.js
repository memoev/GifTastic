// Array with options to query from API.
var fruits = [
    'banana',
    'watermellon',
    'apple',
    'pineapple',
    'tomato'
]

// Render buttons to page.
render();

// Button in form to create new option and push it into the array.
$(".btn").click(function () {
    event.preventDefault();
    var newFruit = $('.form-control').val();
    fruits.push(newFruit);
    $('#buttons-here').empty();
    render();
})

// Render function which creates buttons from the array variable and assigns attributes and class to button.
function render () {
    for (var i = 0; i < fruits.length; i++) {
        var button = $("<button>");
        button.text(fruits[i]);
        button.attr('data', fruits[i]);
        button.addClass("run-api")
        $("#buttons-here").append(button);
    }
    // Gives the button the request from API functionality
    connection();
    // Clears button text after push
    $('#InputFruit').val('');
}

// Connection to API function. 
function connection() {
    $(".run-api").click( function() {
        // Renders a new set of images
        $('#giphy-here').empty();
        // This allows a visible display for the user to know what he has clicked
        $(".run-api").attr("style", "background: #3CB371")
        $(this).attr("style", "background: #2E8B57")

        // API config
        var frutty = $(this).attr("data");
        var keyLock = 'ogy1PqNtCq4mqXG4hlDpZ1iDVeQJjkJI'
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            frutty + "&api_key=" + keyLock + "&limit=10";
    
        // AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
    
            var results = response.data;
    
            // Display results
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gifContain")
    
                // Adding rating of Gif
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
    
                var personImage = $("<img>");
    
                // Img attribute and class creation
                personImage.attr("src", results[i].images.downsized_still.url);
                personImage.attr("data-still", results[i].images.downsized_still.url);
                personImage.attr("data-animate", results[i].images.downsized.url);
                personImage.attr("data-state", "still");
                personImage.addClass("gif");
    
                gifDiv.prepend(personImage);
    
                $(gifDiv).prepend(p);
                $("#giphy-here").prepend(gifDiv);
            }

            // Animates gif on click and makes it still on second click
            $(".gif").on("click", function () {
            
                var state = $(this).attr('data-state')
            
                if (state === 'still') {
                    $(this).attr('src', $(this).attr("data-animate"));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).attr("data-still"));
                    $(this).attr('data-state', 'still');
                }

            });
        });
    });
}

