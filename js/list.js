 
d3.csv("data/all-original.csv", function(error, data) {
  var select = d3.select('body')
    .append('select')
      .attr('class','select')
      .on('change',onchange)

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .text(function (d) { return d.term } );

  function onchange(i) {
      var selectValue = d3.select('select').property('value')
      var total = 0
      d3.select('body')
          .data(data)
          .enter()
          .append('p')
          .filter(function(d) { return d.term == selectValue })
          .text('located in:')
      d3.select('body')
          .data(data)
          .enter()
          .append('p')
          .filter(function(d) { return d.term == selectValue })    
          .text(function(d) { return d.source + ': ' + d.community})
    };

});

