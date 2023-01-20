package;

import openfl.Lib;
import openfl.events.KeyboardEvent;
import texter.general.markdown.Markdown;
import little.Little;
import openfl.events.Event;
import openfl.text.TextField;
import openfl.display.Sprite;

using TextTools;

class Main extends Sprite
{
	public var input:TextField;
	public var output:TextField;

	public function new()
	{
		super();

		Markdown.visualizer.visualConfig.font = "_typewriter";
		Markdown.visualizer.visualConfig.darkMode = true;
		input = new TextField();
		input.defaultTextFormat = Markdown.visualizer.markdownTextFormat;
		input.background = true;
		input.backgroundColor = 0x101010;
		input.height = 365;
		input.width = 608;
		input.type = INPUT;
		input.multiline = true;
		// Lib.application.window.onKeyDown.add((c, m) -> {
		// 	if (c == 13) {
		// 		input.replaceSelectedText("\n");
		// 	}
		// });
		input.addEventListener(Event.CHANGE, e -> {
			input.setTextFormat(Markdown.visualizer.markdownTextFormat, 0, input.text.length);
			var coloring:Array<{color:Int, start:Int, end:Int}> = parseLittle(input.text);
			for (i in coloring)
			{
				input.setTextFormat(new openfl.text.TextFormat("_typewriter", null, i.color), i.start, i.end);
			}

			Little.interpreter.run(input.text);
			output.text = Little.runtime.output;
			trace("change");
		});
		input.text = 'define welcome = "world"\nprint("hello" + welcome)';
		input.x = input.y = 0;

		output = new TextField();
		output.defaultTextFormat = Markdown.visualizer.markdownTextFormat;
		output.background = true;
		output.backgroundColor = 0x101010;
		output.height = 365;
		output.width = 608;
		output.multiline = true;
		output.wordWrap = true;
		output.x = 0;
		output.y = 20 + input.height;
		addChild(input);
		addChild(output);

	}

	function textVisuals() {
		var text = new TextField();
		text.background = true;
		text.backgroundColor = 0x101010;
		text.textColor = 0xFFFFFF;
		text.height = 365;
		text.width = 608;
		return text;
	}

	public function parseLittle(text:String):Array<{color:Int, start:Int, end:Int}>
		{
			var interp:Array<{color:Int, start:Int, end:Int}> = [];
			var indexOfBlue = text.indexesFromEReg(~/(?:\(| |\n|^)(define|true|false|nothing|action|from|to|every|or|and)/m),
				indexOfPurple = text.indexesOfSubs([
					"if", "else", "for", "while"
				]),
				indexOfFunctionName = text.indexesFromEReg(~/([a-zA-Z0-9_]+)\(/m),
				indexOfClassName = text.indexesFromEReg(~/(?::|\(| |\n|^)[A-Z][a-zA-Z]+/m),
				indexOfString = text.indexesFromEReg(~/"[^"]*"|'[^']*'/),
				indexOfNumbers = text.indexesOfSubs(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]),
				indexOfComments = text.indexesFromEReg(~/\/\/.*/m);	
			
			for (i in indexOfFunctionName)
				interp.push({color: 0xFF8700, start: i.startIndex, end: i.endIndex - 1});
			for (i in indexOfBlue)
				interp.push({color: 0x4169E1, start: i.startIndex, end: i.endIndex});
			for (i in indexOfClassName)
				interp.push({color: 0x42B473, start: i.startIndex, end: i.endIndex});
			for (i in indexOfPurple)
				interp.push({color: 0xDC52BF, start: i.startIndex, end: i.endIndex});
			for (i in indexOfString)
				interp.push({color: 0xFF7F50, start: i.startIndex, end: i.endIndex});
			for (i in indexOfNumbers)
				interp.push({color: 0x62D493, start: i.startIndex, end: i.endIndex});
			for (i in indexOfComments)
				interp.push({color: 0x556B2F, start: i.startIndex, end: i.endIndex});
			return interp;
		}
}
