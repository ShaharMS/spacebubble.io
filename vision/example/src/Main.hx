package;

import js.html.CanvasElement;
import vision.ds.Image;
using vision.Vision;
import vision.tools.ImageTools;
import js.html.SelectElement;
import js.Browser.*;
using StringTools;
class Main {
    static function main() {
        trace("work");
    }

    @:expose("change")
    @:native("change")
    static function change() {
        var select:SelectElement = cast document.getElementById("select");
        var funName = select.options[select.selectedIndex].innerText;
        trace(funName);
        ImageTools.loadFromFile("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Valve_original_%281%29.PNG/300px-Valve_original_%281%29.PNG", image -> {
            switch funName {
                case "Sharpen": image = image.sharpen();
                case "Deepfry": image = image.deepfry();
                case "Contrast": image = image.contrast();
                case "Dilate": image = image.dilate();
                case "Erode": image = image.erode();
                case "Mirror": image = image.mirror();
                case "Flip": image = image.flip();
                case "Grayscale": image = image.grayscale();
                case "Invert": image = image.invert();
                case "Black And White": image = image.blackAndWhite();
                case "Gaussian Blur": image = image.gaussianBlur();
                case "Median Blur": image = image.medianBlur();
                case "Nearest-Neighbor Blur": image = image.nearestNeighborBlur();
                case "Salt And Pepper Noise": image = image.saltAndPepperNoise();
                case "White Noise": image = image.whiteNoise();
                case "Drop Out Noise": image = image.dropOutNoise();
                case "Canny Edge Detection": image = image.cannyEdgeDetection();
                case "Perwitt Edge Detection": image = image.perwittEdgeDetection();
                case "Perwitt Edge Diff Operator": image = image.perwittEdgeDiffOperator();
                case "Sobel Edge Detection": image = image.sobelEdgeDetection();
                case "Sobel Edge Diff Operator": image = image.sobelEdgeDiffOperator();
                case "Robert Edge Diff Operator": image = image.robertEdgeDiffOperator();
                case "Bilateral Denoise": image = image.bilateralDenoise();
                case "Detect Lines": {
                    var lines = Vision.simpleLine2DDetection(image.clone(), 50, 30);
			        var newI = image.clone();
			        for (l in lines) {
			        	newI.drawLine2D(l, 0x00FFD5);
			        }
                    image = newI;
                }
            }
            cast (document.getElementById("Result"), CanvasElement).getContext2d().drawImage(imageToCanvas(image), 0 ,0);
        });
    }

    static function imageToCanvas(image:Image) {

        var c = js.Browser.document.createCanvasElement();

		c.width = 300;
		c.height = 300;

		var ctx = c.getContext2d();
		var imageData = ctx.getImageData(0, 0, image.width, image.height);
		var data = imageData.data;

		for (x in 0...image.width) {
			for (y in 0...image.height) {
				var i = (y * image.width + x) * 4;
				data[i] = image.underlying[i + (@:privateAccess Image.OFFSET + 1)];
				data[i + 1] = image.underlying[i + (@:privateAccess Image.OFFSET + 1) + 1];
				data[i + 2] = image.underlying[i + (@:privateAccess Image.OFFSET + 1) + 2];
				data[i + 3] = 255;
			}
		}

		ctx.putImageData(imageData, 0, 0);
        return c;
    }
}