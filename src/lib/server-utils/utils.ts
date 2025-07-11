'use server';

export const decodeBase64 = (str: string) => {
	const decodedBuffer = Buffer.from(str, 'base64');
	// Convert the buffer to a string (assuming UTF-8 encoding)
	const decodedString = decodedBuffer.toString('utf8');
	return decodedString;
};

export const encodeBase64 = (obj: any) => {
	const encoded = Buffer.from(JSON.stringify(obj)).toString('base64');
	return encoded;
};
