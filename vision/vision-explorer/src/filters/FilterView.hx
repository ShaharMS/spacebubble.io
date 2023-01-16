package filters;

import haxe.ui.components.CheckBox;
import haxe.ui.Toolkit;
import haxe.Timer;
import haxe.ui.components.DropDown;
import Collapsible.CollapsibleEvents;
import Collapsible.CollapsibleBuilder;

@:composite(FilterViewEvents, FilterViewBuilder)
class FilterView extends Collapsible {
    public static var FILTERS = [
        "grayscale" => "Grayscale",
        "sharpen" => "Sharpen",
        "deepfry" => "Deep Fry",
        "combine" => "Combine",
        "invert" => "Invert",
        "blackAndWhite" => "BlackAndWhite",
        "contrast" => "Contrast",
        "dilate" => "Dilate",
        "erode" => "Erode",
        "saltAndPepperNoise" => "SaltAndPepperNoise",
        "dropOutNoise" => "DropOutNoise",
        "whiteNoise" => "WhiteNoise",
        "normalize" => "Normalize",
        "limitColorRanges" => "LimitColorRanges",
        "replaceColorRanges" => "ReplaceColorRanges",
        "convolve" => "Convolve",
        "nearestNeighborBlur" => "NearestNeighborBlur",
        "gaussianBlur" => "GaussianBlur",
        "medianBlur" => "MedianBlur",
        "simpleLine2DDetection" => "SimpleLine2DDetection",
        "sobelEdgeDiffOperator" => "SobelEdgeDiffOperator",
        "perwittEdgeDiffOperator" => "PerwittEdgeDiffOperator",
        "robertEdgeDiffOperator" => "RobertEdgeDiffOperator",
        "laplacianEdgeDiffOperator" => "LaplacianEdgeDiffOperator",
        "cannyEdgeDetection" => "CannyEdgeDetection",
        "sobelEdgeDetection" => "SobelEdgeDetection",
        "perwittEdgeDetection" => "PerwittEdgeDetection",
        "laplacianOfGaussianEdgeDetection" => "LaplacianOfGaussianEdgeDetection",
        "convolutionRidgeDetection" => "ConvolutionRidgeDetection",
        "bilateralDenoise" => "BilateralDenoise"
    ];

    private var filterParams:FilterParamsUI = null;
    private var originalImage:vision.ds.Image = null;

    private override function onReady() {
        super.onReady();
        var filterDropDown = findComponent("filterDropDown", DropDown);
        filterDropDown.onChange = function(_) {
            changeFilterParamsUI(filterDropDown.selectedItem.filterId);
        }

        changeFilterParamsUI(filterDropDown.selectedItem.filterId);
    }

    private var _filterId:String;
    public var filterId(get, set):String;
    private function get_filterId():String {
        return _filterId;
    }
    private function set_filterId(value:String):String {
        if (value == _filterId) {
            return value;
        }
        changeFilterParamsUI(value);
        return value;
    }

    private function changeFilterParamsUI(filterId:String) {
        var newUI = createFilterParams(filterId);
        if (newUI == null) {
            return;
        }

        if (filterParams != null) {
            removeComponent(filterParams);
        }

        addComponent(newUI);
        if (originalImage != null) {
            Toolkit.callLater(function() {
                newUI.onImageChanged(originalImage.clone());
            });
        }
        newUI.onChange = function(e) {
            dispatch(e);
        }
        filterParams = newUI;
        _filterId = filterId;
        var filterDropDown = findComponent("filterDropDown", DropDown);
        filterDropDown.selectedIndex = indexOfFilter(_filterId);
    }

    private function createFilterParams(filterId:String):FilterParamsUI {
        var ui:FilterParamsUI = null;
        switch filterId {
            case "combine": ui = new Combine();
            case "grayscale": ui = new Grayscale();
            case "invert": ui = new Invert();
            case "blackAndWhite": ui = new BlackAndWhite();
            case "contrast": ui = new Contrast();
            case "sharpen": ui = new Sharpen();
            case "deepfry": ui = new Deepfry();
            case "dilate": ui = new Dilate();
            case "erode": ui = new Erode();
            case "saltAndPepperNoise": ui = new SaltAndPepperNoise();
            case "dropOutNoise": ui = new DropOutNoise();
            case "whiteNoise": ui = new WhiteNoise();
            case "normalize": ui = new Normalize();
            case "limitColorRanges": ui = new LimitColorRanges();
            case "replaceColorRanges": ui = new ReplaceColorRanges();
            case "convolve": ui = new Convolve();
            case "nearestNeighborBlur": ui = new NearestNeighborBlur();
            case "gaussianBlur": ui = new GaussianBlur();
            case "medianBlur": ui = new MedianBlur();
            case "simpleLine2DDetection": ui = new SimpleLine2DDetection();
            case "sobelEdgeDiffOperator": ui = new SobelEdgeDiffOperator();
            case "perwittEdgeDiffOperator": ui = new PerwittEdgeDiffOperator();
            case "robertEdgeDiffOperator": ui = new RobertEdgeDiffOperator();
            case "laplacianEdgeDiffOperator": ui = new LaplacianEdgeDiffOperator();
            case "cannyEdgeDetection": ui = new CannyEdgeDetection();
            case "sobelEdgeDetection": ui = new SobelEdgeDetection();
            case "perwittEdgeDetection": ui = new PerwittEdgeDetection();
            case "laplacianOfGaussianEdgeDetection": ui = new LaplacianOfGaussianEdgeDetection();
            case "convolutionRidgeDetection": ui = new ConvolutionRidgeDetection();
            case "bilateralDenoise": ui = new BilateralDenoise();
        }
        return ui;
    }

    public function onImageChanged(image:vision.ds.Image) {
        originalImage = image.clone();
        if (filterParams != null) {
            filterParams.onImageChanged(image);
        }
    }

    public function applyFilter(image:vision.ds.Image):vision.ds.Image {
        if (filterParams != null) {
            var enabled = true;
            var filterEnabled = findComponent("filterEnabled", CheckBox);
            if (filterEnabled != null) {
                enabled = filterEnabled.selected;
            }
            trace(filterId, enabled);
            if (enabled) {
                image = filterParams.applyFilter(image);
            }
        }
        return image;
    }

    public function indexOfFilter(filterId:String):Int {
        var n = 0;
        for (k in FilterView.FILTERS.keys()) {
            if (k == filterId) {
                return n;
            }
            n++;
        }
        return -1;
    }
}

//***********************************************************************************************************
// Events
//***********************************************************************************************************
class FilterViewEvents extends CollapsibleEvents {
}

class FilterViewBuilder extends CollapsibleBuilder {
    private var _filterDropDown:DropDown;

    private function new(collapsible:FilterView) {
        super(collapsible);

        _filterDropDown = new DropDown();
        _filterDropDown.id = "filterDropDown";
        _filterDropDown.width = 275;
        _filterDropDown.marginTop = 5;
        _filterDropDown.marginRight = 4;
        _filterDropDown.horizontalAlign = "right";
        for (k in FilterView.FILTERS.keys()) {
            _filterDropDown.dataSource.add({text: FilterView.FILTERS.get(k), filterId: k});
        }
        _header.addComponent(_filterDropDown);
        _filterDropDown.selectedIndex = collapsible.indexOfFilter(collapsible.filterId);
    }
}