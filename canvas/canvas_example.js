/**
*  HTML5 Cross-Browser Canvas Example
*
*  @author William Malone (www.williammalone.com)
*/
var canvasWidth = 267;
var canvasHeight = 200;
var width = 125;
var height = 105;
var padding = 25;
var lineWidth = 8;
var innerBorder = 5;
var primaryColor = "#ffc821";
var secondaryColor = "#faf100";
var tertiaryColor = "#dcaa09";

/**
  Simple Canvas Example
*/

window.onload = windowReady;

/**
  windowReady
*/
function windowReady()
{
	//var context = document.getElementById('canvasComplex').getContext("2d"); // Can't do this with IE
	
	// To account for IE all this must be done
	var foo = document.getElementById("canvasCrossBrowserDiv");
	var canvas = document.createElement('canvas');
	canvas.setAttribute("width", canvasWidth);
	canvas.setAttribute("height", canvasHeight);
	canvas.setAttribute("id", "canvasCrossBrowser");
	foo.appendChild(canvas);
	if (typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}	
	var context = canvas.getContext("2d");

	// Draw the icon
	drawIcon(context);

	// Flip the icon vertically and move it down a little
	context.save();
	context.translate(canvasWidth/2, canvasHeight/2);
	context.rotate(Math.PI);
	context.translate(-canvasWidth/2, -canvasHeight/2 - (35 + height / 2));

	// Draw the icon reflected
	drawIcon(context);

	// Fade bottom of icon (Doesn't work in IE)
	context.restore()
	context.globalCompositeOperation = "destination-out";
	
	gradient = context.createLinearGradient(0, padding + height, 0, canvasHeight);
	gradient.addColorStop(1, "white");
	gradient.addColorStop(0, "transparent");
	
	context.fillStyle = gradient;
	context.fillRect(0, padding + height + 8, canvasWidth, canvasHeight - (padding + height + 8));
}

/**
*  drawIcon
*
*  @param context
*/
function drawIcon(context)
{
	var phi = Math.tan((width/2) / height);
	var x = innerBorder / Math.cos(phi);
	var y = x / Math.tan(phi);
	var gamma = Math.sqrt(Math.abs(innerBorder*innerBorder - x*x));
	
	// Create path around the icon	
	context.beginPath();
	// Top Corner
	context.moveTo(canvasWidth/2 - x, padding);	
	context.quadraticCurveTo(canvasWidth/2, padding - y, canvasWidth/2 + x, padding);

	// Right Corner
	context.lineTo((canvasWidth + width)/2 + gamma, padding + height - gamma);	
	context.quadraticCurveTo((canvasWidth + width)/2 + y, padding + height + innerBorder, (canvasWidth + width)/2, padding + height + innerBorder);
	
	// Left Corner
	context.lineTo((canvasWidth - width)/2, padding + height + innerBorder);
	context.quadraticCurveTo((canvasWidth - width)/2 - y, padding + height + innerBorder, (canvasWidth - width)/2 - gamma, padding + height - gamma);

	// Close Path
	context.lineTo(canvasWidth/2 - x, padding);
	context.closePath();

	// Create a gradient of the the colors we want the icon to be
	var gradient = context.createLinearGradient(0, padding, 0, padding + height);
	gradient.addColorStop(0.5, primaryColor);
	gradient.addColorStop(1, secondaryColor);
	
	// Add a shadow around the object
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 10;
	context.shadowColor = "black";
	
	// Some browsers (Safari, Chrome) don't support shadows on gradient fills yet, so fill a solid color first
	context.fillStyle = "white";
	context.fill();
	
	// Now we can fill the inside of the stroke
	context.fillStyle = gradient;
	context.fill();
	
	context.shadowBlur = 0;
	context.shadowColor = "transparent";
	
	// Add a horizon reflection with a gradient to transparent
	gradient = context.createLinearGradient(0, padding, 0, padding + height);
	gradient.addColorStop(0, "#ffc821");
	gradient.addColorStop(0.55, "#ffcb1e");
	gradient.addColorStop(0.55, tertiaryColor);
	gradient.addColorStop(1, secondaryColor);
	context.fillStyle = gradient;
	context.fill();
	
	// Create a path for the inner outline	
	context.beginPath();
	context.moveTo(canvasWidth/2, padding + lineWidth);
	context.lineTo((canvasWidth + width)/2 - lineWidth, padding + height - lineWidth/2);
	context.lineTo((canvasWidth - width)/2 + lineWidth, padding + height - lineWidth/2);
	context.lineTo(canvasWidth/2, padding + lineWidth);
	context.closePath();

  	// Create a gradient for the inner outline
  	gradient = context.createLinearGradient(0, padding, 0, padding + height);
	gradient.addColorStop(0, "#555");
	gradient.addColorStop(1, "#333");
	
	// Stroke the inner outline
	context.lineWidth = lineWidth;
  	context.lineJoin = "round";	
  	context.strokeStyle = gradient;
	context.stroke();

	// Create an exclamation point
	context.beginPath();
	context.arc(canvasWidth/2, 110, 5, 0, Math.PI*2, true);
	context.moveTo(canvasWidth/2 - 3, 95);
	context.quadraticCurveTo(canvasWidth/2, 105, canvasWidth/2 + 3, 95);
	context.lineTo(canvasWidth/2 + 8, 75);
	context.bezierCurveTo(canvasWidth/2 + 10, 65, canvasWidth/2 - 10, 65, canvasWidth/2 - 8, 75, 5);
	context.lineTo(canvasWidth/2 - 3, 95);
	context.closePath();
	context.fillStyle = "#333";
	context.fill();
}


/**/