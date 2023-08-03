package;

import haxe.io.Bytes;
import lime.utils.AssetBundle;
import lime.utils.AssetLibrary;
import lime.utils.AssetManifest;
import lime.utils.Assets;

#if sys
import sys.FileSystem;
#end

#if disable_preloader_assets
@:dox(hide) class ManifestResources {
	public static var preloadLibraries:Array<Dynamic>;
	public static var preloadLibraryNames:Array<String>;
	public static var rootPath:String;

	public static function init (config:Dynamic):Void {
		preloadLibraries = new Array ();
		preloadLibraryNames = new Array ();
	}
}
#else
@:access(lime.utils.Assets)


@:keep @:dox(hide) class ManifestResources {


	public static var preloadLibraries:Array<AssetLibrary>;
	public static var preloadLibraryNames:Array<String>;
	public static var rootPath:String;


	public static function init (config:Dynamic):Void {

		preloadLibraries = new Array ();
		preloadLibraryNames = new Array ();

		rootPath = null;

		if (config != null && Reflect.hasField (config, "rootPath")) {

			rootPath = Reflect.field (config, "rootPath");

		}

		if (rootPath == null) {

			#if (ios || tvos || emscripten)
			rootPath = "assets/";
			#elseif android
			rootPath = "";
			#elseif console
			rootPath = lime.system.System.applicationDirectory;
			#else
			rootPath = "./";
			#end

		}

		#if (openfl && !flash && !display)
		openfl.text.Font.registerFont (__ASSET__OPENFL__assets_texter_mathtextfield_math_bold_ttf);
		openfl.text.Font.registerFont (__ASSET__OPENFL__assets_texter_mathtextfield_math_regular_ttf);
		openfl.text.Font.registerFont (__ASSET__OPENFL__assets_texter_texttools_sans_ttf);
		openfl.text.Font.registerFont (__ASSET__OPENFL__assets_texter_texttools_serif_ttf);
		
		#end

		var data, manifest, library, bundle;

		#if kha

		null
		library = AssetLibrary.fromManifest (manifest);
		Assets.registerLibrary ("null", library);

		if (library != null) preloadLibraries.push (library);
		else preloadLibraryNames.push ("null");

		#else

		data = '{"name":null,"assets":"aoy4:pathy54:assets%2Ftexter%2FDynamicTextField%2FRotationJoint.pngy4:sizei498y4:typey5:IMAGEy2:idR1y7:preloadtgoR2i285096R3y4:FONTy9:classNamey50:__ASSET__assets_texter_mathtextfield_math_bold_ttfR5y47:assets%2Ftexter%2FMathTextField%2Fmath-bold.ttfR6tgoR2i291936R3R7R8y53:__ASSET__assets_texter_mathtextfield_math_regular_ttfR5y50:assets%2Ftexter%2FMathTextField%2Fmath-regular.ttfR6tgoR2i129796R3R7R8y41:__ASSET__assets_texter_texttools_sans_ttfR5y38:assets%2Ftexter%2FTextTools%2Fsans.ttfR6tgoR2i454852R3R7R8y42:__ASSET__assets_texter_texttools_serif_ttfR5y39:assets%2Ftexter%2FTextTools%2Fserif.ttfR6tgh","rootPath":null,"version":2,"libraryArgs":[],"libraryType":null}';
		manifest = AssetManifest.parse (data, rootPath);
		library = AssetLibrary.fromManifest (manifest);
		Assets.registerLibrary ("default", library);
		

		library = Assets.getLibrary ("default");
		if (library != null) preloadLibraries.push (library);
		else preloadLibraryNames.push ("default");
		

		#end

	}


}


#if kha

null

#else

#if !display
#if flash

@:keep @:bind @:noCompletion #if display private #end class __ASSET__assets_texter_dynamictextfield_rotationjoint_png extends flash.display.BitmapData { public function new () { super (0, 0, true, 0); } }
@:keep @:bind @:noCompletion #if display private #end class __ASSET__assets_texter_mathtextfield_math_bold_ttf extends null { }
@:keep @:bind @:noCompletion #if display private #end class __ASSET__assets_texter_mathtextfield_math_regular_ttf extends null { }
@:keep @:bind @:noCompletion #if display private #end class __ASSET__assets_texter_texttools_sans_ttf extends null { }
@:keep @:bind @:noCompletion #if display private #end class __ASSET__assets_texter_texttools_serif_ttf extends null { }
@:keep @:bind @:noCompletion #if display private #end class __ASSET__manifest_default_json extends null { }


#elseif (desktop || cpp)

@:keep @:image("C:/Users/shaha/Desktop/Github/texter/assets/DynamicTextField/RotationJoint.png") @:noCompletion #if display private #end class __ASSET__assets_texter_dynamictextfield_rotationjoint_png extends lime.graphics.Image {}
@:keep @:font("Export/html5/obj/webfont/math-bold.ttf") @:noCompletion #if display private #end class __ASSET__assets_texter_mathtextfield_math_bold_ttf extends lime.text.Font {}
@:keep @:font("Export/html5/obj/webfont/math-regular.ttf") @:noCompletion #if display private #end class __ASSET__assets_texter_mathtextfield_math_regular_ttf extends lime.text.Font {}
@:keep @:font("Export/html5/obj/webfont/sans.ttf") @:noCompletion #if display private #end class __ASSET__assets_texter_texttools_sans_ttf extends lime.text.Font {}
@:keep @:font("Export/html5/obj/webfont/serif.ttf") @:noCompletion #if display private #end class __ASSET__assets_texter_texttools_serif_ttf extends lime.text.Font {}
@:keep @:file("") @:noCompletion #if display private #end class __ASSET__manifest_default_json extends haxe.io.Bytes {}



#else

@:keep @:expose('__ASSET__assets_texter_mathtextfield_math_bold_ttf') @:noCompletion #if display private #end class __ASSET__assets_texter_mathtextfield_math_bold_ttf extends lime.text.Font { public function new () { #if !html5 __fontPath = "assets/texter/MathTextField/math-bold"; #else ascender = 1907; descender = -849; height = 2756; numGlyphs = 682; underlinePosition = -307; underlineThickness = 102; unitsPerEM = 2048; #end name = "CMU Serif BoldItalic"; super (); }}
@:keep @:expose('__ASSET__assets_texter_mathtextfield_math_regular_ttf') @:noCompletion #if display private #end class __ASSET__assets_texter_mathtextfield_math_regular_ttf extends lime.text.Font { public function new () { #if !html5 __fontPath = "assets/texter/MathTextField/math-regular"; #else ascender = 1905; descender = -765; height = 2670; numGlyphs = 682; underlinePosition = -307; underlineThickness = 102; unitsPerEM = 2048; #end name = "CMU Classical Serif Italic"; super (); }}
@:keep @:expose('__ASSET__assets_texter_texttools_sans_ttf') @:noCompletion #if display private #end class __ASSET__assets_texter_texttools_sans_ttf extends lime.text.Font { public function new () { #if !html5 __fontPath = "assets/texter/TextTools/sans"; #else ascender = 2189; descender = -600; height = 2789; numGlyphs = 1140; underlinePosition = -125; underlineThickness = 50; unitsPerEM = 2048; #end name = "Open Sans Regular"; super (); }}
@:keep @:expose('__ASSET__assets_texter_texttools_serif_ttf') @:noCompletion #if display private #end class __ASSET__assets_texter_texttools_serif_ttf extends lime.text.Font { public function new () { #if !html5 __fontPath = "assets/texter/TextTools/serif"; #else ascender = 1825; descender = -443; height = 2355; numGlyphs = 2503; underlinePosition = -273; underlineThickness = 100; unitsPerEM = 2048; #end name = "Tinos Regular"; super (); }}


#end

#if (openfl && !flash)

#if html5
@:keep @:expose('__ASSET__OPENFL__assets_texter_mathtextfield_math_bold_ttf') @:noCompletion #if display private #end class __ASSET__OPENFL__assets_texter_mathtextfield_math_bold_ttf extends openfl.text.Font { public function new () { __fromLimeFont (new __ASSET__assets_texter_mathtextfield_math_bold_ttf ()); super (); }}
@:keep @:expose('__ASSET__OPENFL__assets_texter_mathtextfield_math_regular_ttf') @:noCompletion #if display private #end class __ASSET__OPENFL__assets_texter_mathtextfield_math_regular_ttf extends openfl.text.Font { public function new () { __fromLimeFont (new __ASSET__assets_texter_mathtextfield_math_regular_ttf ()); super (); }}
@:keep @:expose('__ASSET__OPENFL__assets_texter_texttools_sans_ttf') @:noCompletion #if display private #end class __ASSET__OPENFL__assets_texter_texttools_sans_ttf extends openfl.text.Font { public function new () { __fromLimeFont (new __ASSET__assets_texter_texttools_sans_ttf ()); super (); }}
@:keep @:expose('__ASSET__OPENFL__assets_texter_texttools_serif_ttf') @:noCompletion #if display private #end class __ASSET__OPENFL__assets_texter_texttools_serif_ttf extends openfl.text.Font { public function new () { __fromLimeFont (new __ASSET__assets_texter_texttools_serif_ttf ()); super (); }}

#else
@:keep @:expose('__ASSET__OPENFL__assets_texter_mathtextfield_math_bold_ttf') @:noCompletion #if display private #end class __ASSET__OPENFL__assets_texter_mathtextfield_math_bold_ttf extends openfl.text.Font { public function new () { __fromLimeFont (new __ASSET__assets_texter_mathtextfield_math_bold_ttf ()); super (); }}
@:keep @:expose('__ASSET__OPENFL__assets_texter_mathtextfield_math_regular_ttf') @:noCompletion #if display private #end class __ASSET__OPENFL__assets_texter_mathtextfield_math_regular_ttf extends openfl.text.Font { public function new () { __fromLimeFont (new __ASSET__assets_texter_mathtextfield_math_regular_ttf ()); super (); }}
@:keep @:expose('__ASSET__OPENFL__assets_texter_texttools_sans_ttf') @:noCompletion #if display private #end class __ASSET__OPENFL__assets_texter_texttools_sans_ttf extends openfl.text.Font { public function new () { __fromLimeFont (new __ASSET__assets_texter_texttools_sans_ttf ()); super (); }}
@:keep @:expose('__ASSET__OPENFL__assets_texter_texttools_serif_ttf') @:noCompletion #if display private #end class __ASSET__OPENFL__assets_texter_texttools_serif_ttf extends openfl.text.Font { public function new () { __fromLimeFont (new __ASSET__assets_texter_texttools_serif_ttf ()); super (); }}

#end

#end
#end

#end

#end