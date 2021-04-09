const MAX_LENGTH = 200;
const MIN_LENGTH = 4;

const isCorrectLength = (data) => {
	let length = data.length;
	return length >= MIN_LENGTH && length <= MAX_LENGTH;
};

const isAllCorrectLength = (...args) => {
	let result = true;
	for (let i = 0; i < args.length; i++) {
		if (!isCorrectLength(args[i])) {
			result = false;
			break;
		}
	}

	return result;
};
