d3.csv("data/era.csv", function(data) {
  // convert csv data into flare.json format
  function level(nodes) {
    return d3.nest()
      .key(function(d) { 
        // console.log('key for: ' + JSON.stringify(d));
        if (d.filename.indexOf('/') === -1) return d.filename;
        else return d.filename.substr(0, d.filename.indexOf('/')); 
      })
      .rollup(function(v) {
          // console.log('rollup: ' + JSON.stringify(v));
          // leaf
          if (v.length === 1 && v[0].filename.indexOf('/') === -1) {
            // return {'value': parseInt(v[0].sloc)};
            return {'size': parseInt(v[0].sloc)};
          }
          // node
          v.map(function(d) { d.filename = d.filename.substring(d.filename.indexOf('/')+1); return d; });
          return {'children': level(v)};
      })
      .entries(nodes)
      .map(function(d) { 
        d.values['name'] = d.key;
        return d.values;
      });
  };

  var root = {'name': 'firefox', 'children': level(data)};

});
