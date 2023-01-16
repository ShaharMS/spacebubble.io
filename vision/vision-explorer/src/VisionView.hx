package;

import filters.FilterView;
import filters.Grayscale;
import filters.Sharpen;
import filters.Deepfry;
import haxe.ui.events.MouseEvent;
import haxe.ui.containers.VBox;

@:build(haxe.ui.ComponentBuilder.build("assets/vision-view.xml"))
class VisionView extends VBox {
    var originalImage:vision.ds.Image = null;
    var filters:Array<FilterView> = [];

    public function new() {
        super();
        onLoadButton(null);

        addFilter("deepfry");
        addFilter("sharpen");
        addFilter("grayscale");
    }

    private function addFilter(filterId:String) {
        var f = new FilterView();
        f.filterId = filterId;
        f.collapsed = false;
        f.percentWidth = 100;
        filtersContainer.addComponent(f);
        filters.push(f);
        f.onChange = function(_) {
            applyFilters();
        }
    }

    @:bind(loadButton, MouseEvent.CLICK)
    private function onLoadButton(_) {
        var url = imageUrlField.text;
		vision.tools.ImageTools.loadFromFile(url, data -> {
                originalImage = data;
                onImageChanged(originalImage);
				var canvas = originalImage.toJsCanvas();
				var htmlImage = js.Browser.document.createImageElement();
				htmlImage.src = canvas.toDataURL();
				imagePreview.resource = htmlImage;

                applyFilters();
			}
		);		
    }

    private function onImageChanged(image:vision.ds.Image) {
        for (f in filters) {
            f.onImageChanged(image.clone());
        }
    }

    private function applyFilters() {
        if (originalImage == null) {
            return;
        }
        var image = originalImage.clone();
        for (f in filters) {
            image = f.applyFilter(image.clone());
        }

        var canvas = image.toJsCanvas();
        var htmlImage = js.Browser.document.createImageElement();
        htmlImage.src = canvas.toDataURL();
        imagePreview.resource = htmlImage;
    }
}