# Express 5.x Application - Complete Feature Demonstration

This application demonstrates all the new features and improvements introduced in Express 5.x, as outlined in the [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html).

## 🚀 Express 5.x Features Demonstrated

### 1. **Built-in Body Parsing**

- **No more `body-parser` dependency needed!**
- Express 5.x includes built-in JSON and URL-encoded body parsing
- Supports `application/json` and `application/x-www-form-urlencoded`
- Automatic parsing of request bodies

```javascript
// Express 5.x - Built-in body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// No need for: const bodyParser = require('body-parser');
```

### 2. **Native Async/Await Support**

- Route handlers can now be async functions
- Proper error handling with try/catch blocks
- Automatic promise rejection handling

```javascript
// Express 5.x - Native async/await support
app.get('/users', async (req, res, next) => {
  try {
    const users = await database.getUsers();
    res.json(users);
  } catch (error) {
    next(error); // Express 5.x improved error handling
  }
});
```

### 3. **Improved Error Handling**

- Better error details and context
- Automatic error status code handling
- Enhanced error responses with request information

```javascript
// Express 5.x - Enhanced error handler
app.use((err, req, res, next) => {
  const errorResponse = {
    error: err.message || 'Something went wrong!',
    status: err.status || 500,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  };
  
  res.status(err.status || 500).json(errorResponse);
});
```

### 4. **ES Modules Support**

- Native ES modules with `import`/`export`
- No need for Babel or transpilation
- Better tree-shaking and performance

```javascript
// Express 5.x - ES modules
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
```

### 5. **Enhanced Performance**

- Improved middleware integration
- Better request/response object handling
- Optimized routing performance

### 6. **Better Cookie Handling**

- Enhanced cookie parsing and setting
- Improved security options
- Better cookie management

```javascript
// Express 5.x - Enhanced cookie handling
res.cookie('sessionId', 'abc123', { 
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
});
```

### 7. **Route Chaining**

- Chain multiple HTTP methods on the same route
- Cleaner and more organized route definitions

```javascript
// Express 5.x - Route chaining
app.route('/products')
  .get(async (req, res, next) => {
    // Handle GET request
  })
  .post(async (req, res, next) => {
    // Handle POST request
  });
```

### 8. **Custom Middleware Support**

- Enhanced middleware integration
- Better request/response object extension
- Improved middleware chaining

```javascript
// Express 5.x - Custom middleware
const customMiddleware = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  req.customData = 'Custom data from middleware';
  next();
};
```

## 📁 Express 5.x App Structure

```tree
express5-app/
├── app.js              # Main Express 5.x application
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🛠️ Express 5.x Setup

1. **Install dependencies:**

   ```bash
   cd express5-app
   npm install
   ```

2. **Start the application:**

   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## 🌐 Express 5.x Endpoints

### Basic Routes

- `GET /` - Welcome page with Express 5.x features
- `GET /users` - Get all users (async/await)
- `POST /users` - Create a new user (built-in body parsing)
- `GET /users/:id` - Get user by ID (route parameters)
- `PUT /users/:id` - Update user (PUT method)
- `DELETE /users/:id` - Delete user (DELETE method)

### Cookie Management

- `GET /set-cookie` - Set cookies with enhanced options
- `GET /get-cookies` - Retrieve current cookies
- `GET /clear-cookies` - Clear all cookies

### Advanced Features

- `GET /search?q=query&page=1&limit=10` - Query parameters
- `POST /upload` - File upload simulation
- `GET /api/data` - Custom middleware demonstration
- `GET /products` - Route chaining (GET)
- `POST /products` - Route chaining (POST)

### Error Handling

- Invalid routes return helpful 404 responses
- Missing required fields return proper error messages
- Invalid parameters are handled gracefully

## 🔧 Key Differences from Express 4.x

| Feature | Express 4.x | Express 5.x |
|---------|-------------|-------------|
| Body Parsing | Requires `body-parser` | Built-in |
| Async Routes | Manual promise handling | Native support |
| Error Handling | Basic error responses | Enhanced with context |
| Modules | CommonJS | ES Modules |
| Performance | Standard | Enhanced |
| Cookie Handling | Basic | Improved |

## 🚀 Performance Benefits

Express 5.x provides several performance improvements:

- **Faster middleware execution**
- **Better memory usage**
- **Improved routing performance**
- **Enhanced request/response handling**
- **Better error handling performance**

## 🔒 Security Features

- **Enhanced cookie security** with `sameSite` and `httpOnly` options
- **Better error handling** that doesn't expose sensitive information
- **Improved input validation** with proper error responses
- **Secure headers** and response handling

## 📚 Additional Resources

- [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html)
- [Express 5.x Documentation](https://expressjs.com/)
- [Express 5.x GitHub Repository](https://github.com/expressjs/express)

## 🤝 Contributing

This application serves as a comprehensive demonstration of Express 5.x features. Feel free to:

- Add more feature demonstrations
- Improve error handling
- Enhance documentation

## 📄 License

MIT License - feel free to use this code for learning and development purposes.
