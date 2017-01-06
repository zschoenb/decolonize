//basically a way to get the path to an object
  function searchTree(obj,search,path){
    if(obj.name === search){ //if search is found return, add the object to the path and return it
      path.push(obj);
      return path;
    }
    else if(obj.children || obj._children){ //if children are collapsed d3 object will have them instantiated as _children
      var children = (obj.children) ? obj.children : obj._children;
      for(var i=0;i<children.length;i++){
        path.push(obj);// we assume this path is the right one
        var found = searchTree(children[i],search,path);
        if(found){// we were right, this should return the bubbled-up path from the first if statement
          return found;
        }
        else{//we were wrong, remove this parent from the path and continue iterating
          path.pop();
        }
      }
    }
    else{//not the right object, return false so it will continue to iterate in the loop
      return false;
    }
  }

  function extract_select2_data(node,leaves,index){
          if (node.children){
              for(var i = 0;i<node.children.length;i++){
                  index = extract_select2_data(node.children[i],leaves,index)[0];
              }
          }
          else {
              leaves.push({id:++index,text:node.name});
          }
          return [index,leaves];
  }

  var div = d3.select("body")
    .append("div") // declare the tooltip div
    .attr("class", "tooltip")
    .style("opacity", 0);

  var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 1800 - margin.right - margin.left,
    height = 25000 - margin.top - margin.bottom;

  var i = 0,
    duration = 750,
    root,
    select2_data;


  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
      .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.json("data/all-original-combined.json", function(error,values){
    root = values;
    select2_data = extract_select2_data(values,[],0)[1];//I know, not the prettiest...
   //update(root);
    //init search box
    $("#search").select2({
      data: select2_data,
      containerCssClass: "search"
    });
  });
  //attach search box listener
  $("#search").on("select2-selecting", function(e) {
    var paths = searchTree(root,e.object.text,[]);
    if(typeof(paths) !== "undefined"){
      updateWindow(paths);
    }
    else{
      alert(e.object.text+" not found!");
    }
  })


   var updateWindow = function(data) {
    var text = d3.selectAll("g").selectAll("text")
      .data(data, function(d) { return d.children['name'] });
    
    text.attr("class", "update");

    text.enter().append("text")
        .attr("class", "enter")
        .attr("dy", ".35em")
        .text(function(d) { return d; })

    text.remove()
    text.exit().remove();

  }