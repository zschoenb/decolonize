 
d3.csv("data/all-original.csv", function(error, data) {
  var select = d3.select('body')
    .append('select')
      .attr('class','select')
      .on('change',onchange)

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .text(function (d) { return d.term; });

});

  function onchange() {
    selectValue = d3.select('select').property('value')
    d3.select('body')
      .data(function(d) {return d}).enter()
      .filter(function(d) { return d.term == selectValue })
        .append('p')
        .text(function(d) { return d.source})      
      .remove()      
  };