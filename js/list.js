var data = d3.csv("data/all-original.csv", function(d) {
  return {
    source: d.source,
    type: d.type,
    community: d.community,
    alpha: d.alpha,
    term: d.term,
    count: +d.count
  };
}, function(error, rows) {
  console.log(rows);
});

$(function() {
      $( "#search" ).autocomplete({
         source: function(d) { return d.term; });
      });
  });