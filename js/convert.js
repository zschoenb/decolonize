
	var csvData = d3.csv("data/era.csv")
	
	d3.csvParse(csvData, function(data) {
  		console.log(data)
	});
