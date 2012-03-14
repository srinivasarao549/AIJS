var args, encodeData, fs, AIC, regex;

//get the fs
fs = require('fs');
AIC = require('./aic.js');

//get the args
args = getArgs();

//create the regex
regex = new RegExp('[^' + safeString(AIC.tokenCharacters[0] + AIC.tokenCharacters[1] + AIC.tokenCharacters[2] + AIC.tokenCharacters[3]) + ']');

//make sure a url is given
if(!args.url) { console.log('A path to a JavaScript file or a AIC file is required.'); process.exit(); }

//get the file contents
fs.readFile(args.url, 'utf8', function (err, data) {
	if (err) { console.log('Failed. No file at ' + args.url); process.exit(); }

	//check for characters
	if(!!data.match(regex)) {
		encodeData = true;
	}

	if(encodeData) {
		process.stdout.write(AIC.encode(data));
	} else {
		process.stdout.write(AIC.decode(data));
	}
});

function getArgs() {
	var aI, args, fI, flags, uI, url;

	args = [];
	flags = [];
	url = '';

	for(aI = 0; aI < process.argv.length; aI += 1) {
		if(process.argv[aI] === 'node') { aI += 1; continue; }

		args.push(process.argv[aI]);
	}

	for(fI = 0; fI < args.length; fI += 1) {
		if(args[fI].substr(0, 1) === '-') {
			flags.push(args.splice(fI, 1)[0].substr(1));
			fI -= 1;
		}
	}

	for(uI = 0; uI < args.length; uI += 1) {
		if(args[uI].match(/\.[^\s]+/)) {
			url = args.splice(uI, 1)[0];
			break;
		}
	}

	return {
		"flags": flags,
		"url": url
	}
}

function safeString(text) {

	//clean whitespace
	text = text.replace('\\', '\\\\');
	text = text.replace('\t', '\\t');
	text = text = text.replace('\n', '\\n');
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
