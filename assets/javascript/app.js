var fruits = [
    'banana',
    'watermellon',
    'apple',
    'pineapple',
    'tomato'
]
render();

$(".btn").click(function () {
    event.preventDefault();
    var newFruit = $('.form-control').val();
    fruits.push(newFruit);
    $('#buttons-here').empty();
    render();
})

function render () {
    for (var i = 0; i < fruits.length; i++) {
        var button = $("<button>");
        button.text(fruits[i]);
        button.attr('data', fruits[i]);
        button.addClass("run-api")
        $("#buttons-here").append(button);
    }
    connection();
    $('#InputFruit').val('');
}

function connection() {
    $(".run-api").click( function() {
        $('#giphy-here').empty();
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
    
                gifDiv.prepend(personImage);
    
                $(gifDiv).prepend(p);
                $("#giphy-here").prepend(gifDiv);
            }
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

