

var gamesArray = ["Contra", "Diabo 2", "Starcraft", "Tetris", "Halo", "Bomberman", "Madden NFL", "Super Mario Bros",
"Metroid", "Zelda", "Teenage Mutant Ninja Turtles", "Star Fox 64", "Pokemon", "Resident Evil 5", "Metal Gear Solid",
"Final Fantasy 7", "Kirby", "Dark Souls", "Street Fighter", "Tekken"];


function showGifs() {
	var searchGame = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchGame + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var gifDiv = $("<div class='gifs'>");
		$("#game-gifs").empty();

		for (var i = 0; i < response.data.length && i < 10; i++){
			var rating = response.data[i].rating;
			var ratingP = $("<span>").text("Rating: " + rating);
			gifDiv.append(ratingP);

			var staticURL = response.data[i].images.fixed_height_still.url;
			var staticGif = $("<img>").attr("src", staticURL);
			var animatedURL = response.data[i].images.fixed_height.url;
			staticGif.attr("data-animated", animatedURL);
			staticGif.attr("data-static", staticURL);
			staticGif.attr("data", "still");
			staticGif.addClass("image");
			gifDiv.append(staticGif);

			$("#game-gifs").append(gifDiv); 
		}
	});
}

// click function to play and stop gifs

$(document).on("click", ".image", function() {
	
	console.log(this);
	if($(this).attr('data') === 'still'){
		$(this).attr('src', $(this).attr('data-animated'));
		$(this).attr('data', 'animated');
	}
	else {
		$(this).attr('src', $(this).attr('data-static'));
       	$(this).attr('data', 'still');
	}
});

//created buttons for each item in gamesArray
function createButtons() {
	$("#button-container").empty();

	for (var i = 0; i < gamesArray.length; i++) {
		var gameButtons = $("<button>");
		gameButtons.addClass("game");
		gameButtons.attr("data-name", gamesArray[i]);
		gameButtons.text(gamesArray[i]);
		$("#button-container").append(gameButtons);
	}
}

//user input becoming a button
$("#addGame").on("click", function(event) {
	event.preventDefault();

	var userGame = $("#game-input").val().trim();
	gamesArray.push(userGame);
	createButtons();
	//clears user input after submitting
	$("#game-input").val("");
});
createButtons();


//if you click anything with a class of 'game', the showGifs function will run
$(document).on("click", ".game", showGifs);

//runs this function to show the initaial buttons
createButtons();




// read thru this to see how to line up gifs

// <!DOCTYPE=html>
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <title>GifTastic</title>
//   <style type="text/css">
//     button,
//     div,
//     form,
//     input {
//       margin: 10px;
//     }
//     .single-gif{
//     	display:inline-block;
//     }
//     .single-gif img{
//     	display:block;
//     }
//     .single-gif .gif-rating{
//     	position:relative;
//     	top: -21px;
//     	text-shadow: 0 0 8px #FFFFFF, 0 0 8px #FFFFFF, 0 0 8px #FFFFFF, 0 0 8px #FFFFFF;
//     }
//     body{
//     	background-color: green;
//     }
//     .container{
//     	border:10px;
//     	border-style:dashed;
//     }
//   </style>
// </head>
// <body>

// 	<h1 id="title">Choose your giph</h1>
// <div class="container">
// 	<div id="giph-present"></div>
// 	<form id="giph-form">
// 		<label for="giph-input">Giph Search</label>
// 		<input type="text" id="giph-input">
// 		<br>
// 		<input id="addGiph" type="submit" value="Choose your giph">
// 	</form>
// 		<div id="giphInfo">
// 		</div>

//    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
//     <script type="text/javascript">
//       // Initial array of movies
//       var topics = ["Sunrise", "Scuba Diving", "Cliff Jumping", "Baby Animals"];

//       function displayGifInfo(){
//       	console.log(this);
//       	var name=$(this).attr('data-image');
//       	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=12";

//       	$.ajax({
//           url: queryURL
//           , method: 'GET'
//         }).done(function(response){
//         var newgifdiv=$("<div class='10gifs'>");
//         $("#giphInfo").empty();
//         for (var i=0;i<11;i++){

//         	var singlegifdiv=$("<div class='single-gif'>");
//         	var rating=response.data[i].rating;
        	

//         	var giphPicStill=response.data[i].images.fixed_height_still.url;
//         	var gifPicPresent=$("<img>").attr("src", giphPicStill);
//         	var animatedGif=response.data[i].images.fixed_height.url;
//         	gifPicPresent.attr("data-animated",animatedGif);
//         	gifPicPresent.attr("data-static",giphPicStill);
//         	gifPicPresent.attr("data","still");
//         	gifPicPresent.addClass("image");
//         	singlegifdiv.append(gifPicPresent);

//         	var gifRating=$("<span>").html("Rating:"+rating);
//         	gifRating.addClass('gif-rating');
//         	singlegifdiv.append(gifRating);

//         	$("#giphInfo").append(singlegifdiv);
//         }
//         //   $('#giphInfo').html("<img src='" +response.data.images.fixed_height.url+ "'>");
//         // });
//       });
//     };

//     $(document).on("click", ".image", function() {
    
//     console.log(this);
//     if($(this).attr('data') === 'still'){
//         $(this).attr('src', $(this).attr('data-animated'));
//         $(this).attr('data', 'animated');
//     }
//     else{
//         $(this).attr('src', $(this).attr('data-static'));
//         $(this).attr('data', 'still');
//     }

// });	

//       function renderButtons() {

//         $("#giph-present").empty();

//         for (var i = 0; i < topics.length; i++) {

//          // Then dynamicaly generating buttons for each movie in the array
//           // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//           var a = $("<button>");
//           // Adding a class of movie to our button
//           a.addClass("nature");
//           // Adding a data-attribute
//           a.attr("data-image", topics[i]);
//           // Providing the initial button text
//           a.text(topics[i]);
//           // Adding the button to the buttons-view div
//           $("#giph-present").append(a);
//         }
//       }
//       $("#addGiph").on("click", function(event) {
//         event.preventDefault();

//        // This line grabs the input from the textbox
//         var gif = $("#giph-input").val().trim();

//        // The movie from the textbox is then added to our array
//         topics.push(gif);

//        // Calling renderButtons which handles the processing of our movie array
//         renderButtons();

//      });

//      // Generic function for displaying the movieInfo
//       $(document).on("click", ".nature", displayGifInfo);

//      // Calling the renderButtons function to display the intial buttons
//       renderButtons();
//     </script>
//   </div>
// </body>

// </html>




