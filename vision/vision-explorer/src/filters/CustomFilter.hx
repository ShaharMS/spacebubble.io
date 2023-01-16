package filters;

using vision.Vision;

@:xml(
    <vbox text="" width="100%">
        <hbox width="100%">
            <image width="130" id="previewImageBefore" scaleMode="fitwidth" />
            <image resource="haxeui-core/styles/shared/collapsed-blue.png" verticalAlign="center" />
            <image width="130" id="previewImageAfter" scaleMode="fitwidth" />
        </hbox>
        <checkbox id="filterEnabled" text="Enabled" selected="true" />
    </vbox>
)
class CustomFilter extends FilterParamsUI {

    public var m:String;

    public function new(methodName:String) {
        super();
        m = methodName;
    }

    public override function applyFilter(image:vision.ds.Image, ?methodName:String):vision.ds.Image {
        if (m != "clone") {
            if (image == null) image = VisionView.g.originalImage.clone();
            image = Reflect.callMethod(null, Reflect.field(Vision, m), [image.clone()]);
        }
        return image;
    }
}