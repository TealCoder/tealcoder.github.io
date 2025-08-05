
var tree_left = 0;
var tree_top  = 0;
var insp_width = 300;
var insp_mid = insp_width / 2;
var insp_h_space = 50;
var insp_height = 100;
var insp_v_space = 50;
var insp_drop  = insp_v_space + insp_height; // per column
var insp_scoot = insp_width + insp_h_space;  // per row

// This only works if position is "absolute"
function Move(name, X, Y)
{
	domlay(name.toString(),1,X,Y,2);
  //alert(name + " " + X + " " + Y);
}

function moveStuff()
{
  // Put the canvas right where it was
  var canvas = document.getElementById("branch_canvas");
  var rect = canvas.getBoundingClientRect();
  tree_left = rect.left;
  tree_top = rect.top;
  domlay("branch_canvas",1,tree_left,tree_top,1);

  var max_length = 0;
  for ( var j = 0; j < rows.length; j++ )
  {
    if ( max_length < rows[j].length ) max_length = rows[j].length;
  }
  canvas.width = max_length * insp_scoot - insp_h_space;
  canvas.height = rows.length * insp_drop - insp_v_space;
  var center_left = tree_left + (max_length * insp_scoot) / 2;
  console.log("center_left=" + center_left);
  var top = tree_top;
  var top_mid = new Array(r);
  for ( var r = 0; r < rows.length; r++ )
  {
    var left = center_left - insp_scoot*(rows[r].length) / 2;
    top_mid[r] = new Array(rows[r].length);
    // in javascript new Array(0) == new Array(1): use 0 to mean nothing
    if ( 0 == rows[r].length ) top_mid[r] = 0; 
    for ( var c = 0; c < rows[r].length; c++ )
    {
      var name=rows[r][c];
      // Row 1 will only have the main inspiration in top_mid
      if ( r == 1 && name=="THIS_INSP" )
        top_mid[1][0] = [top-tree_top, left+insp_mid-tree_left];
      else
        top_mid[r][c] = [top-tree_top, left+insp_mid-tree_left];
      console.log("r="+r+",c="+c+",name="+name,"left="+left+",top="+top);
      Move(name, left, top);
      //Move(name, top, left);
      Move(name, 0, 0);
      Move(name, left, top);
      left += insp_scoot;
    } // endloop i
    if (top_mid[r] != 0) top += insp_drop;
  } // endloop j

  // hard coded branches
  console.log("Drawing branch lines:");
  var ctx = canvas.getContext("2d");
  //ctx.fillStyle="#AAAAFF"; ctx.fillRect(0,0,1500,1500); // Debug to see canvas
  ctx.strokeStyle="#A82828";
  ctx.lineWidth = 10;
  ctx.beginPath();
  if ( top_mid[0] != 0 )
  {
  for ( var c = 0; c < top_mid[0].length ; c++ ) // Branches
  {
    ctx.moveTo(top_mid[0][c][1],top_mid[0][c][0] + insp_height); // from branch
    ctx.lineTo(top_mid[1][0][1],top_mid[1][0][0]); // to trunk
    console.log(top_mid[0][c][1] + "," + (top_mid[0][c][0] + insp_height) +
                " - " + top_mid[1][0][1] + "," + top_mid[1][0][0]);
  }
  }else console.log("No branches.")
  if ( top_mid[2] != 0 )
  {
  for ( var c = 0; c < top_mid[2].length ; c++ ) // Roots
  {
    ctx.moveTo(top_mid[2][c][1],top_mid[2][c][0]); // from root
    ctx.lineTo(top_mid[1][0][1],top_mid[1][0][0] + insp_height); // to trunk
    console.log(top_mid[2][c][1] + "," + top_mid[2][c][0] +
                " - " + top_mid[1][0][1] + "," + (top_mid[1][0][0] + insp_height));
  }
  }else console.log("No roots.")
  ctx.stroke();

} // moveStuff()
