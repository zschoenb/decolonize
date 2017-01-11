 
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

 

});


  function onchange(d) {
      var selectValue = d3.select('select').property('value')
      d3.select('body').selectAll('p').remove()
      d3.select('body')
          .data(d)
          .enter()
          .append('p')
          .filter(function(d) { return d.term == selectValue })    
          .text(function(d) { return d.count + ' in ' + d.source + ': ' + d.community})
   };