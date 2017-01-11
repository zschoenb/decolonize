 
d3.csv("data/all-original.csv", function(error, data) {
  var select = d3.select('body')
    .append('select')
      .attr('class','select')
      .on('change',onchange(data))

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .text(function (d) { return d.term } );

 

});


  function onchange(data, i) {
      var selectValue = d3.select('select').property('value')
      console.log(data[0])
      d3.select('body').selectAll('p').remove()
      d3.select('body')
          .data(data)
          .enter()
          .append('p')
          .filter(function(d) { return d.term == selectValue })    
          .text(function(d) { return d.count + ' in ' + d.source + ': ' + d.community})
   };