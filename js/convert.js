d3.csv("data/era.csv", function(data) {
  // convert csv data into flare.json format
  function level(nodes) {
    return d3.nest()
      .key(function(d) { 
        // console.log('key for: ' + JSON.stringify(d));
        if (d.type.indexOf('/') === -1) return d.type;
        else return d.type.substr(0, d.type.indexOf('/')); 
      })
      .rollup(function(v) {
          // console.log('rollup: ' + JSON.stringify(v));
          // leaf
          if (v.length === 1 && v[0].type.indexOf('/') === -1) {
            // return {'value': parseInt(v[0].sloc)};
            return {'size': parseInt(v[0].sloc)};
          }
          // node
          v.map(function(d) { d.type = d.type.substring(d.type.indexOf('/')+1); return d; });
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
