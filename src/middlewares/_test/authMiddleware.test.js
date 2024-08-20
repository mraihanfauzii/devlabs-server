const authMiddleware = require('../authMiddleware'); // Adjust the path to your middleware
const jwtToken = require('../../auth/jwtToken'); // Adjust the path to your jwtToken

// Mock the jwtToken.verifyAccessToken function
jest.mock('../../auth/jwtToken');

const mockRequest = (headers = {}) => ({
  headers,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

const mockNext = () => jest.fn();

describe('authMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if authorization header is missing', () => {
    const req = mockRequest({});
    const res = mockResponse();
    const next = mockNext();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Unauthorized',
      code: 401,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if authorization header does not start with Bearer', () => {
    const req = mockRequest({ authorization: 'Basic token' });
    const res = mockResponse();
    const next = mockNext();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Unauthorized',
      code: 401,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    jwtToken.verifyAccessToken.mockReturnValue(null);

    const req = mockRequest({ authorization: 'Bearer invalidtoken' });
    const res = mockResponse();
    const next = mockNext();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Unauthorized',
      code: 401,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should allow access if token is valid', () => {
    const mockDecodedToken = { id: 1, name: 'Test User' };
    jwtToken.verifyAccessToken.mockReturnValue(mockDecodedToken);

    const req = mockRequest({ authorization: 'Bearer validtoken' });
    const res = mockResponse();
    const next = mockNext();

    authMiddleware(req, res, next);

    expect(req.user).toEqual(mockDecodedToken);
    expect(next).toHaveBeenCalled();
  });
});
