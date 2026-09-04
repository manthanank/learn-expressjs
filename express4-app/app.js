const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express 4.x Application',
    version: '4.x',
    migrationNotes: [
      'Requires body-parser dependency',
      'Manual async/await handling needed',
      'CommonJS module system',
      'Basic error handling',
      'Limited route features'
    ],
    timestamp: new Date().toISOString()
  });
});

app.get('/users', (req, res) => {
  // Simulate async database operation with manual promise handling
  Promise.resolve([
    { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date().toISOString() }
  ])
  .then(users => {
    res.json(users);
  })
  .catch(error => {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Simulate async user creation with manual promise handling
  Promise.resolve({
    id: Math.floor(Math.random() * 1000) + 1,
    name,
    email,
    createdAt: new Date().toISOString()
  })
  .then(newUser => {
    res.status(201).json(newUser);
  })
  .catch(error => {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  });
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  // Simulate async database lookup with manual promise handling
  Promise.resolve({
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date().toISOString()
  })
  .then(user => {
    res.json(user);
  })
  .catch(error => {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  });
});

// Express 4.x: PUT method with body-parser
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Simulate async user update with manual promise handling
  Promise.resolve({
    id: userId,
    name,
    email,
    updatedAt: new Date().toISOString()
  })
  .then(updatedUser => {
    res.json(updatedUser);
  })
  .catch(error => {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  });
});

// Express 4.x: DELETE method
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  // Simulate async user deletion with manual promise handling
  Promise.resolve()
  .then(() => {
    res.status(204).send();
  })
  .catch(error => {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  });
});

// Express 4.x: Cookie handling (still needed in Express 5)
app.get('/set-cookie', (req, res) => {
  res.cookie('sessionId', 'abc123', { 
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
  res.cookie('user', 'john', { maxAge: 60 * 60 * 1000 }); // 1 hour
  res.json({ message: 'Cookies set successfully' });
});

app.get('/get-cookies', (req, res) => {
  res.json({
    message: 'Current cookies',
    cookies: req.cookies,
    signedCookies: req.signedCookies
  });
});

// Express 4.x: Query parameters (basic handling)
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

// Express 4.x: File upload simulation (requires additional middleware)
app.post('/upload', (req, res) => {
  res.json({
    message: 'File upload simulation',
    note: 'In Express 4.x, you would need multer or similar for file handling',
    contentType: req.headers['content-type']
  });
});

// Express 4.x: Custom middleware (basic implementation)
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

// Express 4.x: Route chaining (not available, using separate routes)
app.get('/products', (req, res) => {
  Promise.resolve([
    { id: 1, name: 'Product 1', price: 29.99 },
    { id: 2, name: 'Product 2', price: 49.99 }
  ])
  .then(products => {
    res.json(products);
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  });
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  
  Promise.resolve({
    id: Math.floor(Math.random() * 1000) + 1,
    name,
    price: parseFloat(price)
  })
  .then(newProduct => {
    res.status(201).json(newProduct);
  })
  .catch(error => {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  });
});

// Express 4.x: Basic 404 handling
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Express 4.x: Basic error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`Express 4.x app listening on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see the app`);
  console.log('\nExpress 4.x patterns demonstrated:');
  console.log('- Requires body-parser dependency');
  console.log('- Manual promise handling for async operations');
  console.log('- CommonJS module system (require/module.exports)');
  console.log('- Basic error handling');
  console.log('- Limited route features (no chaining)');
  console.log('- Manual async/await implementation needed');
}); 