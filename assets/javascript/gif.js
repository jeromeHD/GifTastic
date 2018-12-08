// intitial array
$(document).ready(function() {
  var brands = ["Porsche", "Ferrari", "Ford"];

  function displayCar() {
    var brand = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      brand +
      "&api_key=EWySVaM6VxgJek3aijUPwR2SqIbPUE8c&limit10";

    //function for calling gif's

    $.ajax({ url: queryURL, method: "GET" }).then(function(response) {
      console.log(response.data);
      for (var i = 0; i < response.data.lenght; i++) {
        var carImage = $("<img>");
        carImage.attr("src", response.data[i].images.downsized_still.url);
        carImage.attr(
          "data-still",
          response.data[i].images.downsized_still.url
        );
        carImage.attr("data-animate", response.data[i].images.downsized.url);
        carImage.attr("data-state", "still");
        carImage.attr("class", "gif");
        $("#gifs-appear-here").prepend(
          "<p>Rating: " + response.data[i].rating + "</p>"
        );
        $("#gifs-appear-here").prepend(carImage);
      }
    });
  }
  function renderButtons() {
    $("#buttonArea").empty();

    for (var i = 0; i < brands.length; i++) {
      var a = $("<button>");
      a.addClass("brand-btn");
      a.attr("data-name", brands[i]);
      a.text(brands[i]);
      $("#buttonArea").append(a);
    }
  }

  $("#addBrand").on("click", function(event) {
    event.preventDefault();
    var brand = $("#brandInput")
      .val()
      .trim();

    brands.push(brand);

    renderButtons();
    document.getElementById("addButtonSearch").reset();
  });

  $("#gifs-appear-here").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log("Gif Clicked");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $(document).on("click", ".brand-btn", displayCar);

  renderButtons();
});
