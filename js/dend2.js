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

  var diameter = 960;

  var tree = d3.layout.tree()
    .size([height, width]);

  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
      .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //recursively collapse children
  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
      }
      else{
      d.children = d._children;
      d._children = null;
      }
    update(d);
  }

  function openPaths(paths){
    for(var i =0;i<paths.length;i++){
      if(paths[i].id !== "1"){//i.e. not root
        paths[i].class = 'found';
        if(paths[i]._children){ //if children are hidden: open them, otherwise: don't do anything
          paths[i].children = paths[i]._children;
            paths[i]._children = null;
        }
        update(paths[i]);
      }
    }
  }

  function getData(d) {
    return d;
  }

  d3.json("data/all-original-combined.json", function(error,values){
    root = values;
    select2_data = extract_select2_data(values,[],0)[1];//I know, not the prettiest...
    root.x0 = height / 2;
    root.y0 = 0;
    root.children.forEach(collapse);
    update(root);
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
      openPaths(paths);
    }
    else{
      alert(e.object.text+" not found!");
    }
  })

  d3.select(self.frameElement).style("height", "1200px");

  function update(source) {

    var levelWidth = [1];
    var childCount = function(level, n) {
    
    if(n.children && n.children.length > 0) {
      if(levelWidth.length <= level + 1) levelWidth.push(0);
      
      levelWidth[level+1] += n.children.length;
      n.children.forEach(function(d) {
        childCount(level + 1, d);
      });
    }
  };

  childCount(0, root);  
  var newHeight = d3.max(levelWidth) * 48; // 20 pixels per line  
  tree = tree.size([newHeight, width]).sort(function(a,b){
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodesâ€¦
    var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
    .on("click", click)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

 //   nodeEnter.append("circle")
 //   .attr("r", 1e-6)
 //   .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -20 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "start" : "end"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);      
  

      wrap(d3.selectAll('text'),200);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  //  nodeUpdate.select("circle")
  //    .attr("r", 4.5)
  //    .style("fill", function(d) {
  //      if(d.class === "found"){
   //       return "#ff4136"; //red
  //      }
  //      else if(d._children){
  //        return "lightsteelblue";
  //      }
  //      else{
  //        return "#fff";
  //      }
  //    })
  //    .style("stroke", function(d) {
  //      if(d.class === "found"){
  //        return "#ff4136"; //red
  //      }
  //  });

    nodeUpdate.select("text")
      .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

   // nodeExit.select("circle")
   //   .attr("r", 1e-6);

    nodeExit.select("text")
      .style("fill-opacity", 1e-6);

    // Update the linksâ€¦
    var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

    // Transition links to their new position.
    link.transition()
      .duration(duration)
      .attr("d", diagonal)
      .style("stroke",function(d){
        if(d.target.class==="found"){
          return "#ff4136";
        }
      });

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
      });
  }

function mouseover(d) {
    if (d.size != undefined) {
      d3.select(this).append("text")
        .attr("class", "hover")
        .attr('transform', function(d){ 
            return 'translate(10, -11)';
         })
        .text(d.size + " in this community");
    }
}

// Toggle children on click.
function mouseout(d) {
  if (d.size != undefined) {
    d3.select(this).select("text.hover").remove();
  }
}

    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.5, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", -20).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", -20).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
        d3.select(this.parentNode.children[0]).attr('height', 19 * (lineNumber+1));
        
      });
    }