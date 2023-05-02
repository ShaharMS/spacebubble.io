package;

import little.Keywords;
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
			Little.run(input.text);
			output.text = Little.runtime.stdout;

			input.setTextFormat(Markdown.visualizer.markdownTextFormat, 0, input.text.length);
			var coloring:Array<{color:Int, start:Int, end:Int}> = parseLittle(input.text);
			for (i in coloring)
			{
				input.setTextFormat(new openfl.text.TextFormat("_typewriter", null, i.color), i.start, i.end);
			}
		});
		input.text = 'define welcome = " world"\nprint("hello" + welcome)\nprint({define i = "Hi!", (i + " Whats up?")})';
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

		input.dispatchEvent(new Event(Event.CHANGE));

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
			
			var indexOfBlue = text.indexesFromEReg(new EReg('\\b(${Keywords.VARIABLE_DECLARATION}|${Keywords.FUNCTION_DECLARATION}|${Keywords.TRUE_VALUE}|${Keywords.FALSE_VALUE}|${Keywords.NULL_VALUE}|${Keywords.FOR_LOOP_IDENTIFIERS.FROM}|${Keywords.FOR_LOOP_IDENTIFIERS.TO}|${Keywords.FOR_LOOP_IDENTIFIERS.JUMP})\\b', "m")),
				indexOfPurple = text.indexesOfSubs(Keywords.CONDITION_TYPES),
				indexOfFunctionName = text.indexesFromEReg(~/([a-zA-Z0-9_]+)\(/m),
				indexOfClassName = text.indexesFromEReg(~/(?::|\(| |\n|^)[A-Z][a-zA-Z]+/m),
				indexOfString = text.indexesFromEReg(~/"[^"]*"|'[^']*'/),
				indexOfNumbers = text.indexesOfSubs(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]),
				indexOfComments = text.indexesFromEReg(~/\/\/.*/m);	
			
			for (i in indexOfFunctionName)
				interp.push({color: 0xdcdcaa, start: i.startIndex, end: i.endIndex - 1});
			for (i in indexOfBlue)
				interp.push({color: 0x569cd6, start: i.startIndex, end: i.endIndex});
			for (i in indexOfClassName)
				interp.push({color: 0x44c9b0, start: i.startIndex, end: i.endIndex});
			for (i in indexOfPurple)
				interp.push({color: 0xc586c0, start: i.startIndex, end: i.endIndex});
			for (i in indexOfNumbers)
				interp.push({color: 0xb5cea8, start: i.startIndex, end: i.endIndex});
			for (i in indexOfString)
				interp.push({color: 0xff5e00, start: i.startIndex, end: i.endIndex});
			for (i in indexOfComments)
				interp.push({color: 0x5e5e5e, start: i.startIndex, end: i.endIndex});
			return interp;
		}
}
