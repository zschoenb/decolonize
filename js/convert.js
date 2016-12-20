//var table = d3.csvParse("data/eraFlare.csv");
var root = d3.stratify()
    .id(function(d) { return d.name; })
    .parentId(function(d) { return d.parent; })
    ("data/eraFlare.csv");