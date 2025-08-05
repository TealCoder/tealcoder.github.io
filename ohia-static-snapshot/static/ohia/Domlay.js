function domlay(id,visible,lax,lay,laz,content) {
/*
 * Cross browser Layer visibility / Placement Routine
 * Done by Chris Heilmann (mail@ichwill.net)
 * Feel free to use with these lines included!
 * Created with help from Scott Andrews.
 * The marked part of the content change routine is taken
 * from a script by Reyn posted in the DHTML
 * Forum at Website Attraction and changed to work with
 * any layername. Cheers to that!
 * Welcome DOM-1, about time you got included... :)
 * Charley Neilsen added the zIndex paragraph, and changed to allow for a -1 to be passed to ignore an argument
 */
 
 // shead 2015-02-13 Position should be absolute 
if (document.layers){document.layers[''+id+''].style.position = 'absolute'}
	else if (document.all){document.all[''+id+''].style.position = 'absolute'}
	else if (document.getElementById){document.getElementById(''+id+'').style.position = 'absolute'}
 
// Layer visible
if (visible=="1"){
	if (document.layers) document.layers[''+id+''].visibility = "show"
	else if (document.all) document.all[''+id+''].style.visibility = "visible"
	else if (document.getElementById) document.getElementById(''+id+'').style.visibility = "visible"				
	}
// Layer hidden
else if (visible=="0"){
	if (document.layers) document.layers[''+id+''].visibility = "hide"
	else if (document.all) document.all[''+id+''].style.visibility = "hidden"
	else if (document.getElementById) document.getElementById(''+id+'').style.visibility = "hidden"				
	}
// Set horizontal position	
if (lax >= 0){
	if (document.layers){document.layers[''+id+''].left = lax}
	else if (document.all){document.all[''+id+''].style.left=lax}
	else if (document.getElementById){document.getElementById(''+id+'').style.left=lax+"px"}
	}
// Set vertical position
if (lay >= 0){
	if (document.layers){document.layers[''+id+''].top = lay}
	else if (document.all){document.all[''+id+''].style.top=lay}
	else if (document.getElementById){document.getElementById(''+id+'').style.top=lay+"px"}
	}
// Set z position
if (laz>= 0){
	if (document.layers){document.layers[''+id+''].zIndex = laz}
	else if (document.all){document.all[''+id+''].style.zIndex = laz}
	else if (document.getElementById){document.getElementById(''+id+'').style.zIndex = laz}
	}
// change content

if (content){
if (document.layers){
	sprite=document.layers[''+id+''].document;
	// add father layers if needed! document.layers[''+father+'']...
  	sprite.open();
  	sprite.write(content);
  	sprite.close();
	}
else if (document.all) document.all[''+id+''].innerHTML = content;	
else if (document.getElementById){
	//Thanx Reyn!
	rng = document.createRange();
	el = document.getElementById(''+id+'');
	rng.setStartBefore(el);
	htmlFrag = rng.createContextualFragment(content)
	while(el.hasChildNodes()) el.removeChild(el.lastChild);
	el.appendChild(htmlFrag);
	// end of Reyn ;)
	}
}


}
