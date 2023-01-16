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
class CannyEdgeDetection extends FilterParamsUI {
    public override function applyFilter(image:vision.ds.Image):vision.ds.Image {
        image = image.cannyEdgeDetection();
        return image;
    }
}