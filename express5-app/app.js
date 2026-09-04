import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Express 5.x has built-in body parsing, cookie parsing still needs cookie-parser
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Cookie parsing middleware

// Express 5.x: Built-in body parsing demonstration
app.get('/', async (req, res) => {
  res.json({
    message: 'Welcome to Express 5.x Application',
    version: '5.x',
    features: [
      'Built-in body parsing (no body-parser needed)',
      'Native async/await support in route handlers',
      'Improved error handling with better error details',
      'ES modules support',
      'Enhanced performance',
      'Better middleware integration',
      'Improved cookie handling',
      'Better request/response objects'
    ],
    timestamp: new Date().toISOString(),
    cookies: req.cookies || {},
    headers: req.headers
  });
});

// Express 5.x: Async route handlers with proper error handling
app.get('/users', async (req, res, next) => {
  try {
    // Simulate async database operation
    const users = await Promise.resolve([
      { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date().toISOString() }
    ]);
    
    res.json(users);
  } catch (error) {
    next(error); // Express 5.x improved error handling
  }
});

// Express 5.x: POST with built-in body parsing
app.post('/users', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      const error = new Error('Name and email are required');
      error.status = 400;
      throw error;
    }
    
    // Simulate async user creation
    const newUser = await Promise.resolve({
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      createdAt: new Date().toISOString()
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// Express 5.x: Route parameters with async/await
app.get('/users/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      const error = new Error('Invalid user ID');
      error.status = 400;
      throw error;
    }
    
    // Simulate async database lookup
    const user = await Promise.resolve({
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date().toISOString()
    });
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Express 5.x: PUT method with body parsing
app.put('/users/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    
    if (isNaN(userId)) {
      const error = new Error('Invalid user ID');
      error.status = 400;
      throw error;
    }
    
    if (!name || !email) {
      const error = new Error('Name and email are required');
      error.status = 400;
      throw error;
    }
    
    // Simulate async user update
    const updatedUser = await Promise.resolve({
      id: userId,
      name,
      email,
      updatedAt: new Date().toISOString()
    });
    
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Express 5.x: DELETE method
app.delete('/users/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      const error = new Error('Invalid user ID');
      error.status = 400;
      throw error;
    }
    
    // Simulate async user deletion
    await Promise.resolve();
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Express 5.x: Cookie demonstration with improved handling
app.get('/set-cookie', (req, res) => {
  res.cookie('sessionId', 'abc123', { 
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.cookie('user', 'john', { 
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: false
  });
  res.json({ 
    message: 'Cookies set successfully',
    cookies: {
      sessionId: 'abc123',
      user: 'john'
    }
  });
});

app.get('/get-cookies', (req, res) => {
  res.json({
    message: 'Current cookies',
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    headers: {
      cookie: req.headers.cookie
    }
  });
});

// Express 5.x: Clear cookies
app.get('/clear-cookies', (req, res) => {
  res.clearCookie('sessionId');
  res.clearCookie('user');
  res.json({ message: 'Cookies cleared successfully' });
});

// Express 5.x: Query parameters demonstration
app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  
  res.json({
    message: 'Search results',
    query: q,
    page: parseInt(page),
    limit: parseInt(limit),
    results: [
      { id: 1, title: 'Sample result 1' },
      { id: 2, title: 'Sample result 2' }
    ]
  });
});

// Express 5.x: File upload simulation (multipart/form-data)
app.post('/upload', express.raw({ type: 'multipart/form-data', limit: '10mb' }), (req, res) => {
  res.json({
    message: 'File upload simulation',
    contentType: req.headers['content-type'],
    bodyLength: req.body.length,
    note: 'In real app, you would use multer or similar for file handling'
  });
});

// Express 5.x: Custom middleware demonstration
const customMiddleware = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  req.customData = 'This is custom data from middleware';
  next();
};

app.use('/api', customMiddleware);

app.get('/api/data', (req, res) => {
  res.json({
    message: 'API data with custom middleware',
    requestTime: req.requestTime,
    customData: req.customData
  });
});

// Express 5.x: Route chaining
app.route('/products')
  .get(async (req, res, next) => {
    try {
      const products = await Promise.resolve([
        { id: 1, name: 'Product 1', price: 29.99 },
        { id: 2, name: 'Product 2', price: 49.99 }
      ]);
      res.json(products);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, price } = req.body;
      const newProduct = await Promise.resolve({
        id: Math.floor(Math.random() * 1000) + 1,
        name,
        price: parseFloat(price)
      });
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  });

// Express 5.x: Improved 404 handling
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    availableRoutes: [
      'GET /',
      'GET /users',
      'POST /users',
      'GET /users/:id',
      'PUT /users/:id',
      'DELETE /users/:id',
      'GET /set-cookie',
      'GET /get-cookies',
      'GET /clear-cookies',
      'GET /search',
      'POST /upload',
      'GET /api/data',
      'GET /products',
      'POST /products'
    ]
  });
});

// Express 5.x: Enhanced error handler with better error information
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Express 5.x provides better error details
  const errorResponse = {
    error: err.message || 'Something went wrong!',
    status: err.status || 500,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  };
  
  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(err.status || 500).json(errorResponse);
});

app.listen(PORT, () => {
  console.log(`🚀 Express 5.x app listening on port ${PORT}`);
  console.log(`📍 Visit http://localhost:${PORT} to see the app`);
  console.log('\n✨ Express 5.x features demonstrated:');
  console.log('   ✅ Built-in body parsing (no body-parser needed)');
  console.log('   ✅ Native async/await support in route handlers');
  console.log('   ✅ Improved error handling with better error details');
  console.log('   ✅ ES modules support');
  console.log('   ✅ Enhanced performance and middleware integration');
  console.log('   ✅ Better cookie handling');
  console.log('   ✅ Route chaining');
  console.log('   ✅ Custom middleware support');
  console.log('   ✅ Query parameter handling');
  console.log('   ✅ File upload simulation');
  console.log('   ✅ Comprehensive error responses');
}); 