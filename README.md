# GifTastic
Use of APIs with jQuery AJAX to make a dynamic web page that populates with gifs.

## Value Proposition :dart:
  
Fully responsive `GIPHY` generator, which can be added to a dynamic web page to make it more attrative to clicks (no SEO).

## Instructions :memo:  
  
 Graphic Interchange Format generator displaying top 10 results out of a list of button options with default values, this list can be extended by user input. Gifs get rendered in still status format, but when clicked they start playing. Pausing can be achived by clicking a second time.  
  
Form included to allow user input to create additional category buttons. Each button has an API connection which pulls Gifs out of the GIPHY API.  
  
## Code Overview :deciduous_tree:

The most import piece of code on this repository is the `AJAX` request calling a data response from the `GIPHY API`. It requeries a `queryURL` input with a data attribute from the category selected and a `API KEY` provided by GIPHY.
  
```javascript
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + frutty + "&api_key=" + keyLock + "&limit=10";

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

        // Gifs getting rendered into the page
        gifDiv.prepend(personImage);
        $(gifDiv).prepend(p);
        $("#giphy-here").prepend(gifDiv);
    }
```  
  
## Prerequisites :computer:
Working web browser (e.g Chrome, Firefox, Safari, Opera, etc.) from the list of browser that support jQuery (https://jquery.com/browser-support/):

* Desktop:
  * Chrome: (Current - 1) and Current
  * Edge: (Current - 1) and Current
  * Firefox: (Current - 1) and Current, ESR
  * Internet Explorer: 9+
  * Safari: (Current - 1) and Current
  * Opera: Current

* Mobile
  * Stock browser on Android 4.0+
  * Safari on iOS 7+
