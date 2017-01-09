
d3.csv("data/all-original.csv", function(d) {
  return {
    source: d.Source,
    type: d.Type,
    community: d.Community,
    alpha: d.Aplha,
    term: d.Term,
    count: +d.Count
  };
}, function(error, rows) {
  console.log(rows);
});

$(function() {
      $( "#search" ).autocomplete({
         source: function(d) { return d.Term; } 
      });
  });