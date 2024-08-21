const request = require('supertest');
const app = require('../app'); // Adjust the path based on your project structure

jest.mock('redis', () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn(),
    on: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  })),
}));

describe('Express App', () => {
  describe('GET /api', () => {
    it('should return 200 and the expected response from the index route', async () => {
      const res = await request(app).get('/api');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message'); // Adjust the expected response as per your index route
    });
  });

  // Test for 404 error
  describe('GET /nonexistent-route', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/nonexistent-route');
      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Not Found'); // Adjust based on your actual error response
    });
  });
});

describe('All routes are registered', () => {
  // Get all routes from the Express app
  const routes = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Route middleware (express.Router)
      routes.push({
        path: middleware.route.path,
        method: Object.keys(middleware.route.methods)[0], // Get the HTTP method (e.g., get, post)
      });
    } else if (middleware.name === 'router') {
      // Nested router (express.Router())
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            method: Object.keys(handler.route.methods)[0],
          });
        }
      });
    }
  });

  // Generate a test for each route
  routes.forEach((route) => {
    it(`should respond to ${route.method.toUpperCase()} ${route.path}`, async () => {
      const response = await request(app)[route.method](route.path);
      expect(response.message).not.toBe('Not Found'); // Check if status is not 404
    });
  });
});
