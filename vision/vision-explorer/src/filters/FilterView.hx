package filters;

import haxe.ui.components.CheckBox;
import haxe.ui.Toolkit;
import haxe.Timer;
import haxe.ui.components.DropDown;
import Collapsible.CollapsibleEvents;
import Collapsible.CollapsibleBuilder;

@:composite(FilterViewEvents, FilterViewBuilder)
class FilterView extends Collapsible {
    public static var FILTERS = [for (k in Type.getClassFields(vision.Vision)) k => k];

    private var filterParams:FilterParamsUI = null;
    private var originalImage:vision.ds.Image = null;
    public var filterDropDown:DropDown;

    private override function onReady() {
        super.onReady();
        filterDropDown = findComponent("filterDropDown", DropDown);
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
        ui = new CustomFilter(filterId);
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
            _filterDropDown.dataSource.add({text: k, filterId: k});
        }
        _filterDropDown.dataSource.add({text: "clone", filterId: "clone"});
        _header.addComponent(_filterDropDown);
        _filterDropDown.selectedIndex = collapsible.indexOfFilter(collapsible.filterId);
        _filterDropDown.onChange = (_) -> {
            VisionView.g.onLoadButton(null);
        }
    }
}