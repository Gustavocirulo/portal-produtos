// Corrige erro do Jest: ReferenceError: TextEncoder is not defined
const util = require('util');
if (typeof global.TextEncoder === 'undefined') {
	global.TextEncoder = util.TextEncoder as any;
}
if (typeof global.TextDecoder === 'undefined') {
	global.TextDecoder = util.TextDecoder as any;
}
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
