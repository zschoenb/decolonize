  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
      .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




  var options = dropDown.selectAll("option")
                  .data(data) // eg., data = [ {'value': 10}, {'value': 11}, {'value': 12} ]
                  .enter()
                  .append("option");
  
  svg.selectAll("search").append("option")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

updateSearch(data)


   var updateWindow = function(data) {

    data.forEach(function(currentValue, index) {
      var text = d3.selectAll("g").selectAll("text")
      .data(currentValue, function(d) { return d });
    
    text.attr("class", "update");

    text.enter().append("text")
        .attr("class", "enter")
        .attr("dy", ".35em")
        .text(function(d) { return d.name; })

    
    text.exit().remove();
  });


  $( function() {
    availableTags = d3.csv("data/all-original.csv", function(error, data) {
      if (error) throw error;()
      data.forEach(function(d) {
        source: d.Source,
        community: d.Community,
        type: d.Type,
        aplha: d.Alpha,
        term: d.Term,
        count: +d.Count
      });
      return d.Term
    }

    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );

  }