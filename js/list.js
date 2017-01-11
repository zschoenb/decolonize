 
d3.csv("data/all-original.csv", function(error, data) {
  var select = d3.select('body')
    .append('select')
      .attr('class','select')
      .on('change',function(d,i) {
      //var selectValue = d3.select('select').property('value')
        d3.select('body')
            .data(data)
            .enter()
            .append('p')
            .text(d[i])      
        });

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .text(function (d) { return d.term; });


    data.forEach(function(d) {
        d.count = +d.count;
    });

});
