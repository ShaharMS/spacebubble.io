package filters;

import haxe.ui.components.CheckBox;
import haxe.ui.components.Image;
import haxe.ui.containers.VBox;

using vision.Vision;

class FilterParamsUI extends VBox {
    private override function onReady() {
        super.onReady();
        var filterEnabled = findComponent("filterEnabled", CheckBox);
        if (filterEnabled != null) {
            filterEnabled.onChange = function(e) {
                dispatch(e);
            }
        }
    }

    public function applyFilter(image:vision.ds.Image, ?methodName:String):vision.ds.Image {
        return image;
    }

    public function onImageChanged(image:vision.ds.Image) {
        var temp = image.clone();
        var imageBefore = findComponent("previewImageBefore", Image);
        if (imageBefore != null) {
            var canvas = temp.toJsCanvas();
            var htmlImage = js.Browser.document.createImageElement();
            htmlImage.src = canvas.toDataURL();
            imageBefore.resource = htmlImage;
        }

        var imageAfter = findComponent("previewImageAfter", Image);
        if (imageAfter != null) {
            var filteredImage = applyFilter(temp.clone());
            var canvas = filteredImage.toJsCanvas();
            var htmlImage = js.Browser.document.createImageElement();
            htmlImage.src = canvas.toDataURL();
            imageAfter.resource = htmlImage;
        }
    }
}