/**
 * AIC TRANSCRIPTOR
 */
(function(factory){

	//commonjs
	if(typeof module === 'object' && typeof document === 'undefined') {
		module.exports = factory();

		//amd
	} else if(typeof define === 'function' && define.amd) {
		define(factory);

		//global
	} else {
		AIC = factory();
	}

})(function() {
	var api, symbols, tokenChars, tokens;

	tokenChars = ['a', 'b', 'c', 'd'];

	symbols = [
		'(', ')', '{', '}', '[', ']', '<', '>',
		'!', ':', ';', "'", '"', '`', ',', '@', '#', '$', '^', '.', '?',
		'+', '-', '_', '*', '/', '|', '\\', '=', '%', '&', '~',
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		' ', '\t', '\n', '\r', '\f', '\v', '\0'
	];
	genTokens(symbols);

	api = {
		"encode": encode,
		"decode": decode,
		"genTokens": genTokens,
		"tokenCharacters": tokenChars,
		"symbols": symbols
	};

	/**
	 * Encodes text into AIC
	 * @param data
	 */
	function encode(data) {
		var aic;

		data = data.split('');
		aic = '';

		while(data.length) {
			aic += tokenize(data.shift());
		}
		return aic;
	}

	/**
	 * Decodes AIC to text
	 * @param aic
	 */
	function decode(aic) {
		var data;

		data = '';
		aic = aic.split('');

		while(aic.length) {
			data += deTokenize(aic.shift() + aic.shift() + aic.shift() + aic.shift());
		}

		return data;
	}

	/**
	 * Returns a token representing the passed character
	 * @param char
	 */
	function tokenize(char) {
		var key;
		for(key in tokens) {
			if(tokens[key] === char) {
				return key;
			}
		}
		throw new Error('No token for ' + char);
	}

	/**
	 * Returns the character represented by the
	 * @param token
	 */
	function deTokenize(token) {
		if(!tokens[token]) { throw new Error('Unrecognized token ' + token); }
		return tokens[token];
	}

	function genTokens() {
		var tAI, i, ii, iii, iiii;

		iiii = iii = ii = i = tokenChars[0];
		tokens = {};

		for(tAI = 0; tAI < symbols.length; tAI += 1) {

			tokens[iiii + iii + ii + i] = symbols[tAI];

			i = iterate(i);
			if(i === tokenChars[0]) {
				ii = iterate(ii);
				if(ii === tokenChars[0]) {
					iii = iterate(iii);
					if(iii === tokenChars[0]) {
						iiii = iterate(iiii);
						if(iiii === tokenChars[0]) {
							iiii = iii = ii = i = tokenChars[0];
						}
					}
				}
			}
		}

		function iterate(i) {
			if(i === tokenChars[3]) { i = tokenChars[0]}
			else if(i === tokenChars[0]) { i = tokenChars[1]}
			else if(i === tokenChars[1]) { i = tokenChars[2]}
			else if(i === tokenChars[2]) { i = tokenChars[3]}
			return i;
		}
	}

	return api;
});
