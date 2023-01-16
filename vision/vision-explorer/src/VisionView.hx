package;

import filters.FilterView;
import haxe.ui.events.MouseEvent;
import haxe.ui.containers.VBox;

@:build(haxe.ui.ComponentBuilder.build("assets/vision-view.xml"))
class VisionView extends VBox {

    public static var g:VisionView;

    public var originalImage:vision.ds.Image = null;
    var filters:Array<FilterView> = [];

    public function new() {
        super();
        onLoadButton(null);
        g = this;
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
    public function onLoadButton(_) {
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
    @:bind(newFilter, MouseEvent.CLICK)
    private function addNewFilter(_) {
        addFilter("grayscale");
        onLoadButton(null);
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