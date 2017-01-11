 
d3.csv("data/all-original.csv", function(error, data) {
  var select = d3.select('body')
    .append('select')
      .attr('id','descriptions')
      .on('change',onchange)

  alert(function() {return d})
  
  $( function() {
    $( "#descriptions" ).autocomplete({
      source: data
    });
  } );

  function onchange(i) {
      var selectValue = d3.select('select').property('value')
      d3.selectAll('p').remove()
      d3.select('body')
          .data(data)
          .enter()
          .append('p')
          .filter(function(d) { return d.term == selectValue })    
          .text(function(d) { return d.count + ' in ' + d.source + ': ' + d.community})


    };

});

