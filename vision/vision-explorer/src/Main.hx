package ;

import haxe.ui.Toolkit;
import haxe.ui.HaxeUIApp;

import js.html.File;
import js.html.Blob;
import js.html.URL;

using StringTools;
class Main {
    public static function main() {
        Toolkit.theme = "dark";
        var app = new HaxeUIApp();
        app.ready(function() {
            app.addComponent(new MainView());

            app.start();
        });

        //file generator
//         for (f in Type.getClassFields(vision.Vision)) {
//             var cname = f.charAt(0).toUpperCase() + f.substring(1);
//             var code = 'package filters;

// using vision.Vision;

// @:xml(
//     <vbox text="" width="100%">
//         <hbox width="100%">
//             <image width="130" id="previewImageBefore" scaleMode="fitwidth" />
//             <image resource="haxeui-core/styles/shared/collapsed-blue.png" verticalAlign="center" />
//             <image width="130" id="previewImageAfter" scaleMode="fitwidth" />
//         </hbox>
//         <checkbox id="filterEnabled" text="Enabled" selected="true" />
//     </vbox>
// )
// class $cname extends FilterParamsUI {
//     public override function applyFilter(image:vision.ds.Image):vision.ds.Image {
//         image = image.$f();
//         return image;
//     }
// }';
//             downloadAsHx(code, cname);
//         }
        
        //map generator
        var s = "";
        for (f in Type.getClassFields(vision.Vision)) {
            s += '"$f" => "${f.charAt(0).toUpperCase() + f.substring(1)}"\n';
        }
        trace(s);

        //switch generator
        var s = "switch filterId {";
        for (f in Type.getClassFields(vision.Vision)) {
            s += 'case "$f": ui = new ${f.charAt(0).toUpperCase() + f.substring(1)}();\n';
        }
        trace(s + "\n}");
    }
    
  static function downloadAsHx(content:String, fileName:String) {
    if (!fileName.endsWith(".hx")) fileName += ".hx";
    var blob = new Blob([content], {type:"text/hx"});
    var url = URL.createObjectURL(blob);
    var link:Dynamic = js.Browser.document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }
}
