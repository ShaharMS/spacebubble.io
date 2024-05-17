package;

import little.Little.keywords;
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
	public var lines:TextField;
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
		input.height = 320;
		input.width = 608;
		input.type = INPUT;
		input.multiline = true;
		input.wordWrap = false;
		input.text = 'define welcome = " world"\nprint("hello" + welcome)\nprint({define i = "Hi!", (i + " Whats up?")})';
		input.x = 38;
		input.y = 0;
		
		lines = new TextField();
		var linesF = Markdown.visualizer.markdownTextFormat;
		linesF.align = RIGHT;
		linesF.color = 0x373737;
		lines.defaultTextFormat = linesF;
		lines.multiline = true;
		lines.wordWrap = false;
		lines.background = true;
		lines.backgroundColor = 0x101010;
		lines.height = 320;
		lines.width = 40;
		lines.x = 0;
		lines.y = 0;
		lines.selectable = false;
		lines.mouseWheelEnabled = false;

		input.addEventListener(Event.CHANGE, e -> {
			try {
				Little.run(input.text);
				output.text = Little.runtime.stdout.output.replaceFirst("\n", "");
				input.setTextFormat(Markdown.visualizer.markdownTextFormat, 0, input.text.length);
				var coloring:Array<{color:Int, start:Int, end:Int}> = parseLittle(input.text);
				for (i in coloring)
				{
					input.setTextFormat(new openfl.text.TextFormat("_typewriter", null, i.color), i.start, i.end);
				}

				var lineCount = input.text.countOccurrencesOf("\n");
				var status = lines.text.countOccurrencesOf("\n");
				for (i in status...lineCount + 1) {
					lines.text += '$i|\n';
				}
				for (i in lineCount + 1...status) {
					lines.text = lines.text.subtract('$i|\n');
				}
				lines.scrollV = input.scrollV;
			} catch (e) trace(e.details());
		});
		
		input.addEventListener(Event.SCROLL, e -> {
			lines.scrollV = input.scrollV;
		});

		


		output = new TextField();
		output.defaultTextFormat = Markdown.visualizer.markdownTextFormat;
		output.background = true;
		output.backgroundColor = 0x101010;
		output.height = 340;
		output.width = 646;
		output.multiline = true;
		output.wordWrap = true;
		output.x = 0;
		output.y = 20 + input.height;
		addChild(input);
		addChild(lines);
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
		
		var indexOfIdent = text.indexesFromEReg(~/\w+/),
			indexOfBlue = text.indexesFromEReg(new EReg('\\b(${Little.keywords.VARIABLE_DECLARATION}|${Little.keywords.FUNCTION_DECLARATION}|${Little.keywords.TRUE_VALUE}|${Little.keywords.FALSE_VALUE}|${Little.keywords.NULL_VALUE}|${Little.keywords.FOR_LOOP_FROM}|${Little.keywords.FOR_LOOP_TO}|${Little.keywords.FOR_LOOP_JUMP})\\b', "m")),
			indexOfPurple = text.indexesOfSubs(Little.keywords.CONDITION_TYPES.concat([Little.keywords.ELSE])),
			indexOfFunctionName = text.indexesFromEReg(~/([a-zA-Z0-9_]+)\(/m),
			indexOfClassName = text.indexesFromEReg(~/(?::|\(| |\n|^)[A-Z][a-zA-Z]+/m),
			indexOfString = text.indexesFromEReg(~/"[^"]*"|'[^']*'/),
			indexOfNumbers = text.indexesOfSubs(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]),
			indexOfComments = text.indexesFromEReg(~/\/\/.*/m);	
	
		for (i in indexOfIdent)
			interp.push({color: 0x9cdcfe, start: i.startIndex, end: i.endIndex});
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
