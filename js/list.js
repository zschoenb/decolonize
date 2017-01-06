$(function() {
    availableTags = d3.csv("data/all-original.csv", function(error, data) {
      if (error) throw error;
      auto(data);

    });
    var auto = function(availableTags) {
      console.log(d3.data(function(d) { return d.term } ); )
      availableTags = ['yes','no'];
      $( "#search" ).autocomplete({
        source: availableTags
      });
    }
  });