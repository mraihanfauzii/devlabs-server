const dataWrapper = require('../dataWrapper');

describe('dataWrapper', () => {
  describe('data', () => {
    it('should return data object', () => {
      const data = { key: 'value' };
      expect(dataWrapper.data(data)).toEqual({ error: null, data });
    });
  });

  describe('error', () => {
    it('should return error object', () => {
      const error = new Error('Error message');
      expect(dataWrapper.error(error)).toEqual({ error, data: null });
    });
  });
});
