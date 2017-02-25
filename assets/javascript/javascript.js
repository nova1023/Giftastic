

var gamesArray = ["Contra", "Diablo 2", "Starcraft", "Tetris", "Halo", "Bomberman", "Madden NFL", "Super Mario Bros",
"Metroid", "Zelda", "Teenage Mutant Ninja Turtles", "Star Fox 64", "Pokemon", "Resident Evil 5", "Metal Gear Solid",
"Final Fantasy 7", "Kirby", "Dark Souls", "Street Fighter", "Tekken"];


function showGifs() {
	var searchGame = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchGame + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		
		$("#game-gifs").empty();

		for (var i = 0; i < response.data.length && i < 10; i++){
			var singleGifs = $("<div class='gifs'>");

			var staticURL = response.data[i].images.fixed_height_still.url;
			var staticGif = $("<img>").attr("src", staticURL);
			var animatedURL = response.data[i].images.fixed_height.url;
			staticGif.attr("data-animated", animatedURL);
			staticGif.attr("data-static", staticURL);
			staticGif.attr("data", "still");
			staticGif.addClass("image");
			singleGifs.append(staticGif);

			var rating = response.data[i].rating;
			var ratingP = $("<span>").text("Rating: " + rating);
			ratingP.addClass("ratings");
			singleGifs.append(ratingP);

			$("#game-gifs").append(singleGifs); 
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




