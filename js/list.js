$(function() {
    availableTags = d3.csv("data/all-original.csv", function(error, data) {
      if (error) throw error;
      auto(data);
    });
    var auto = function(data) {
      $( "#search" ).autocomplete({
        source: availableTags
      });
    }
  });