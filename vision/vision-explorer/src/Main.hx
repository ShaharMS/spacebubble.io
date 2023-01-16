package ;

import haxe.ui.Toolkit;
import haxe.ui.HaxeUIApp;

class Main {
    public static function main() {
        Toolkit.theme = "dark";
        var app = new HaxeUIApp();
        app.ready(function() {
            app.addComponent(new MainView());

            app.start();
        });
    }
}
