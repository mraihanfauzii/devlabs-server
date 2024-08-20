const { validatePayload } = require('../index'); // Adjust the path to validatePayload

describe('validatePayload', () => {
  let mockSchema;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return dataWrapper.error when validation fails', () => {
    // Mock schema with validation error
    mockSchema = {
      validate: jest.fn().mockReturnValue({
        value: null,
        error: {
          details: [
            { message: '"field" is required' },
            { message: '"age" must be a number' },
          ],
        },
      }),
    };

    const payload = { field: '', age: 'not-a-number' };
    const result = validatePayload(mockSchema, payload);

    expect(mockSchema.validate).toHaveBeenCalledWith(payload, { abortEarly: false });
    expect(result).toEqual({
      error: ['field is required', 'age must be a number'],
      data: null,
    });
  });

  it('should return dataWrapper.data when validation succeeds', () => {
    // Mock schema with successful validation
    mockSchema = {
      validate: jest.fn().mockReturnValue({
        value: { field: 'value', age: 25 },
        error: null,
      }),
    };

    const payload = { field: 'value', age: 25 };
    const result = validatePayload(mockSchema, payload);

    expect(mockSchema.validate).toHaveBeenCalledWith(payload, { abortEarly: false });
    expect(result).toEqual({
      error: null,
      data: { field: 'value', age: 25 },
    });
  });
});
