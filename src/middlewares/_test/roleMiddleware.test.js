const roleMiddleware = require('../roleMiddleware'); // Adjust the path to your roleMiddleware

const mockRequest = (user = {}) => ({
  user,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

const mockNext = () => jest.fn();

describe('roleMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 403 if user role is not in requiredRoles', () => {
    const req = mockRequest({ role: 'user' });
    const res = mockResponse();
    const next = mockNext();

    const middleware = roleMiddleware(['admin', 'moderator']);
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Forbidden',
      code: 403,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user role is in requiredRoles (array)', () => {
    const req = mockRequest({ role: 'admin' });
    const res = mockResponse();
    const next = mockNext();

    const middleware = roleMiddleware(['admin', 'moderator']);
    middleware(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should call next if user role is in requiredRoles (string)', () => {
    const req = mockRequest({ role: 'moderator' });
    const res = mockResponse();
    const next = mockNext();

    const middleware = roleMiddleware('moderator');
    middleware(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should handle case-insensitivity for roles', () => {
    const req = mockRequest({ role: 'Admin' });
    const res = mockResponse();
    const next = mockNext();

    const middleware = roleMiddleware(['admin']);
    middleware(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
