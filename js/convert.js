d3.csv("data/era.csv", function(data) {
  // convert csv data into flare.json format
  function level(nodes) {
    return d3.nest()
      .key(function(d) { 
        // console.log('key for: ' + JSON.stringify(d));
        return d.name;
        
      })
      .rollup(function(v) {
          // console.log('rollup: ' + JSON.stringify(v));
          // leaf

            // return {'value': parseInt(v[0].sloc)};
            return {'size': parseInt(v[0].size)};
          }
          // node
          v.map(function(d) { d.name = d.name.substring(d.name.indexOf('/')+1); return d; });
          return {'children': level(v)};
      })
      .entries(nodes)
      .map(function(d) { 
        d.values['name'] = d.key;
        return d.values;
      });
  };

  var root = {'name': 'description', 'children': level(data)};

});
