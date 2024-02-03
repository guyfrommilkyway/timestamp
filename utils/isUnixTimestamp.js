const isUnixTimestamp = (number) => {
	// Check if it's a number
	if (typeof number !== 'number') {
		return false;
	}

	// Check if it's a positive integer
	if (number <= 0 || Math.floor(number) !== number) {
		return false;
	}

	// Assuming it's a reasonable range for Unix timestamps
	const maxTimestamp = 2147483647;

	return number > maxTimestamp;
};

module.exports = isUnixTimestamp;
