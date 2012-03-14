e(window).on('load', function() {
	var regex, tokens, input, output, token1, token2, token3, token4;

	//gen the regex
	regex = new RegExp('[^' + safeString(AIC.tokenCharacters[0] + AIC.tokenCharacters[1] + AIC.tokenCharacters[2] + AIC.tokenCharacters[3]) + ']');

	//get the elements
	input = e('#input');
	output = e('#output');
	token1 = e('#token1');
	token2 = e('#token2');
	token3 = e('#token3');
	token4 = e('#token4');

	//setup the default token data
	tokens = e.emitter();

	token1.value(AIC.tokenCharacters[0]);
	token2.value(AIC.tokenCharacters[1]);
	token3.value(AIC.tokenCharacters[2]);
	token4.value(AIC.tokenCharacters[3]);

	tokens.pipe(token1);
	tokens.pipe(token2);
	tokens.pipe(token3);
	tokens.pipe(token4);
	
	tokens.on('keyup', function(event) {

		if(event.keyCode === 13) {
			tokens.trigger('change');
			event.target.blur();
		}

		if(e(event.target).value().length > 0) {
			e(event.target).value(e(event.target).value().substr(0, 1));
		}
	});
	
	tokens.on('blur', function() {
		var values, vI, vII;

		values = [];
		values[0] = token1.value();
		values[1] = token2.value();
		values[2] = token3.value();
		values[3] = token4.value();

		for(vI = 0; vI < values.length; vI += 1) {
			for(vII = 0; vII < values.length; vII += 1) {
				if(vI !== vII && values[vI] === values[vII]) {
					return;
				}
			}
		}

		AIC.tokenCharacters[0] = values[0];
		AIC.tokenCharacters[1] = values[1];
		AIC.tokenCharacters[2] = values[2];
		AIC.tokenCharacters[3] = values[3];

		regex = new RegExp('[^' + safeString(AIC.tokenCharacters[0] + AIC.tokenCharacters[1] + AIC.tokenCharacters[2] + AIC.tokenCharacters[3]) + ']');

		AIC.genTokens();

		transcribe(input.value());
	});

	input.on('keydown', function(event) {
		if(event.keyCode === 9) {
			e.preventDefault();
			return false;
		}
	});

	input.on('keyup', function(event) {
		transcribe(input.value());
	});

	function transcribe(input) {
		try {
			if(!!input.match(regex)) {
				output.value(AIC.encode(input));
			} else {
				output.value(AIC.decode(input));
			}
		} catch(err) {
			output.value('');
		}
	}

	function safeString(text) {

		//clean whitespace
		text = text.replace('\\', '\\\\');
		text = text.replace('\t', '\\t');
		text = text.replace('\n', '\\n');
		text = text.replace('\r', '\\r');
		text = text.replace('\f', '\\f');
		text = text.replace('\v', '\\v');
		text = text.replace('\0', '\\0');

		//escape regex syntax
		text = text.replace('[', '\\[');
		text = text.replace('^', '\\^');
		text = text.replace('$', '\\$');
		text = text.replace('.', '\\.');
		text = text.replace('|', '\\|');
		text = text.replace('?', '\\?');
		text = text.replace('*', '\\*');
		text = text.replace('+', '\\+');
		text = text.replace('(', '\\(');
		text = text.replace(')', '\\)');
		text = text.replace('{', '\\{');
		text = text.replace('}', '\\}');

		return text;
	}
});

