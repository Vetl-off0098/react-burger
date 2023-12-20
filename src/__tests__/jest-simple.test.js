import {checkResponse} from '../utils/burger-api';

describe('check checkResponse function', () => {
		test('should return success', () => {
				const testObj = {
						ok: true,
						json: function() {
								return {result: 'OK'};
						}
				}

				const result = checkResponse(testObj);
				expect(result).toEqual({result: 'OK'})
		})
})
