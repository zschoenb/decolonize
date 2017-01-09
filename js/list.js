d3.csv("data/all-original.csv", function(d) {
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

console.log(return{function(d) { return d; }})

$(function() {
      $( "#search" ).autocomplete({
         source: return{function(d) { return d; }}
      });
  });