//function to convert array of games into buttons
	//function to pull 10 static gifs with their ratings when a button is clicked
	// response.data[i].images.downsized_still = static gif
	// response.data[i].images.downsized = animated gif
	//need to pull the static gif initially
	//when user clicks a static gif, need to replace
	//static gif with animated gif 
	//the rating of each gif should appear below the gif (.append)

var gamesArray = ["Contra", "Diabo 2", "Starcraft", "Tetris", "Halo", "Destiny", "Madden NFL", "Super Mario",
"Metroid", "Zelda", "Teenage Mutant Ninja Turtles", "Star Fox", "Pokemon", "Resident Evil", "Metal Gear Solid",
"Final Fantasy", "Kirby", "Dark Souls", "Street Fighter", "Tekken"];

function showGifs() {
	var searchGame = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchGame + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var gifDiv = $("<div class='gifs'>");
		$("#game-gifs").empty();

		for (var i = 0; i < 11; i++){
			var rating = response.data[i].rating;
			// console.log(response.data[i].rating);
			var ratingP = $("<p>").text("Rating: " + rating);
			gifDiv.append(ratingP);

			var gifURL = response.data[i].images.fixed_height_still.url;
			var staticGif = $("<img>").attr("src", gifURL);
			gifDiv.append(staticGif);


			$("#game-gifs").append(gifDiv);
		}
	});
}


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



