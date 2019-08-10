var fruits = [
    'banana',
    'watermellon',
    'apple',
    'pineapple',
    'tomato'
]
console.log(fruits);


for (var i = 0; i < fruits.length; i++) {
    console.log(i);
    var button = $("<button></button>");
    button.text(fruits[i]);
    button.attr('data', fruits[i]);
    button.addClass("run-api")
    $("#buttons-here").append(button);
    
}

$(".run-api").click( function() {
    // alert($(this).attr('data'))
    var frutty = $(this).attr("data");
    var keyLock = 'ogy1PqNtCq4mqXG4hlDpZ1iDVeQJjkJI'
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        frutty + "&api_key=" + keyLock;

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

            // var rating = results[i].rating;

            // var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);
            console.log(results[i].source);

            gifDiv.prepend(personImage);

            $("#giphy-here").prepend(gifDiv);
        }
    });
});