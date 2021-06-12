const stringToEncode = document.querySelector('#stringToEncode');
const errorMessage = document.querySelector('.error');
const btnSubmit = document.querySelector('#btnSubmit');
const btnClear = document.querySelector('#clearAll');

function validation() {
	if (stringToEncode.value === '' || stringToEncode.value.length > 81) {
		errorMessage.classList.remove('hide');
		return;
	}
	else {
		errorMessage.classList.add('hide');
		encodeText();
	}
}

function hideError() {
	errorMessage.classList.add('hide');
}

function clearFields() {
	stringToEncode.value = '';
	document.querySelector('.message-wrapper').innerHTML = '';
	hideError();
}

function arrayToEncode() {
	const flattenStringToEncode = stringToEncode.value.toLowerCase().replace(/\W/g, '');
	const arrayForCoding = flattenStringToEncode.split('');
	const chunkLength = Math.ceil(Math.sqrt(arrayForCoding.length));
	const arr = [];
	while (arrayForCoding.length) {
		arr.push(arrayForCoding.splice(0, chunkLength));
	}
	return arr;
}

function encodeText() {
	const chunkedArray = [...arrayToEncode()];
	let encodedArray = [];
	for (let i = 0; i < chunkedArray[0].length; i++) {
		let tempArray = [];
		for (let j = 0; j < chunkedArray.length; j++) {
			if (chunkedArray[j][i] === undefined)
				continue;
			tempArray.push(chunkedArray[j][i]);
		}
		encodedArray.push(tempArray);
	}
	// render encoded message
	document.querySelector('.message-wrapper').innerHTML = '';
	let encodedMessage = '';
	encodedArray.forEach(chunk => {
		encodedMessage += `<span class="encoded-message-part">${chunk.join('')} </span>`
	})
	document.querySelector('.message-wrapper').innerHTML += `<p class="encoded-message">${encodedMessage}</p>`;
}
btnSubmit.addEventListener('click', validation);
stringToEncode.addEventListener('input', hideError);
btnClear.addEventListener('click', clearFields);