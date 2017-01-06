  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
      .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  $( function() {
    availableTags = d3.csv("data/all-original.csv", function(error, data) {
      if (error) throw error;
      $( "#search" ).autocomplete({
        source: availableTags
      });
    });
  } );

  }