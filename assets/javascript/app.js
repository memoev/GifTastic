var fruits = [
    'banana',
    'watermellon',
    'apple',
    'pineapple',
    'tomato'
]
// console.log(fruits);
render();

$(".btn").click(function () {
    event.preventDefault();
    var newFruit = $('.form-control').val();
    fruits.push(newFruit);
    console.log(fruits);
    $('#buttons-here').empty();
    render();
    // connection();
    // alert(newFruit);
    // var newButton = $("<button>");
    // newButton.text(newFruit);
    // newButton.attr('data', newFruit);
    // newButton.addClass("run-api")
    // $("#buttons-here").append(newButton);
})

function render () {
    for (var i = 0; i < fruits.length; i++) {
        console.log(i);
        var button = $("<button>");
        button.text(fruits[i]);
        button.attr('data', fruits[i]);
        button.addClass("run-api")
        $("#buttons-here").append(button);
    }
    connection();
}

function connection() {
    $(".run-api").click( function() {
        // alert($(this).attr('data'))
        $('#giphy-here').empty();
        console.log('hi');
        $(".run-api").attr("style", "background: #3CB371")
        $(this).attr("style", "background: #2E8B57")
        
        var frutty = $(this).attr("data");
        var keyLock = 'ogy1PqNtCq4mqXG4hlDpZ1iDVeQJjkJI'
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            frutty + "&api_key=" + keyLock + "&limit=10";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.        
            // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.
    
            console.log(response);
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gifContain")
    
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
    
                var personImage = $("<img>");
    
                // Img attribute and class creation
                personImage.attr("src", results[i].images.downsized_still.url);
                personImage.attr("data-still", results[i].images.downsized_still.url);
                personImage.attr("data-animate", results[i].images.downsized.url);
                personImage.attr("data-state", "still");
                personImage.addClass("gif");
    
                console.log(results[i].source);
    
                gifDiv.prepend(personImage);
    
                $("#giphy-here").prepend(gifDiv);
                $(gifDiv).prepend(p);
            }
            $(".gif").on("click", function () {
                // alert('hi');
                // STEP ONE: study the html above.
                // Look at all the data attributes.
                // Run the file in the browser. Look at the images.
            
                // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.
            
                // STEP TWO: make a variable named state and then store the image's data-state into it.
                // Use the .attr() method for this.
            
                // ============== FILL IN CODE HERE FOR STEP TWO =========================
            
                var state = $(this).attr('data-state')
                console.log(state);
                
            
                // =============================================
            
                // STEP THREE: Check if the variable state is equal to 'still',
                // then update the src attribute of this image to it's data-animate value,
                // and update the data-state attribute to 'animate'.
            
                // If state is equal to 'animate', then update the src attribute of this
                // image to it's data-still value and update the data-state attribute to 'still'
                // ============== FILL IN CODE HERE FOR STEP THREE =========================
            
                if (state === 'still') {
                    $(this).attr('src', $(this).attr("data-animate"));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).attr("data-still"));
                    $(this).attr('data-state', 'still');
                }
            
                // ==============================================
            
                // STEP FOUR: open the file in the browser and click on the images.
                // Then click again to pause.
            });
        });
    });
}

