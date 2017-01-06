$(function() {
    availableTags = d3.csv("data/all-original.csv", function(error, data) {
      if (error) throw error;
      console.log(data.term)

    });
    var auto = function(availableTags) {
      console.log(availableTags)
      $( "#search" ).autocomplete({
        source: availableTags
      });
    }
  });