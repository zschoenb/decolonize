$(function() {
    availableTags = d3.csv("data/all-original.csv", function(error, data) {
      if (error) throw error;
      auto(data);

    });
    var auto = function(data) {
      console.log(function(d) { return d.term; } )
      $( "#search" ).autocomplete({
         source: function(d) { return d.term; } 
      });
    }
  });