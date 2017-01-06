  $( function() {
    availableTags = d3.csv("data/all-original.csv", function(error, data) {
      if (error) throw error;
      $( "#search" ).autocomplete({
        source: availableTags
      });
    });
  });