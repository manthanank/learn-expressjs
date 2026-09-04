# Express 4.x Application - Migration Patterns

This application demonstrates Express 4.x patterns that need to be migrated when upgrading to Express 5.x, as outlined in the [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html).

## Features

- Express 4.x with traditional middleware setup
- Body parser for JSON and URL-encoded data
- Cookie parser
- Morgan for HTTP request logging
- Basic CRUD operations for users
- Error handling middleware

## 🔄 Migration Patterns Demonstrated

### 1. **Body Parsing Dependency**

- **Express 4.x**: Requires separate `body-parser` package
- **Migration to Express 5.x**: Use built-in `express.json()` and `express.urlencoded()`

```javascript
// Express 4.x - Requires body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express 5.x - Built-in body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### 2. **Manual Async/Await Handling**

- **Express 4.x**: Manual promise handling with `.then()` and `.catch()`
- **Migration to Express 5.x**: Native async/await support in route handlers

```javascript
// Express 4.x - Manual promise handling
app.get('/users', (req, res) => {
  Promise.resolve(users)
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: 'Failed' }));
});

// Express 5.x - Native async/await
app.get('/users', async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
```

### 3. **CommonJS Module System**

- **Express 4.x**: Uses `require()` and `module.exports`
- **Migration to Express 5.x**: Native ES modules with `import`/`export`

```javascript
// Express 4.x - CommonJS
const express = require('express');
const morgan = require('morgan');

// Express 5.x - ES modules
import express from 'express';
import morgan from 'morgan';
```

### 4. **Basic Error Handling**

- **Express 4.x**: Basic error responses with limited context
- **Migration to Express 5.x**: Enhanced error handling with better context

```javascript
// Express 4.x - Basic error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Something went wrong!' });
});

// Express 5.x - Enhanced error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
    status: err.status,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});
```

### 5. **Limited Route Features**

- **Express 4.x**: No route chaining, separate route definitions
- **Migration to Express 5.x**: Route chaining and advanced features

```javascript
// Express 4.x - Separate routes
app.get('/products', (req, res) => { /* ... */ });
app.post('/products', (req, res) => { /* ... */ });

// Express 5.x - Route chaining
app.route('/products')
  .get(async (req, res, next) => { /* ... */ })
  .post(async (req, res, next) => { /* ... */ });
```

## 📁 Project Structure

```tree
express4-app/
├── app.js              # Express 4.x application with migration patterns
├── package.json        # Dependencies including body-parser
└── README.md          # This file
```

## 🛠️ Installation & Setup

1. **Install dependencies:**

   ```bash
   cd express4-app
   npm install
   ```

2. **Start the application:**

   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

3. **Compare with Express 5.x:**

   ```bash
   # From the root directory
   node compare-express-versions.js
   ```

## 🌐 Available Endpoints

### Basic Routes

- `GET /` - Welcome message with migration notes
- `GET /users` - Get all users (manual promise handling)
- `POST /users` - Create a new user (requires body-parser)
- `GET /users/:id` - Get user by ID (manual validation)
- `PUT /users/:id` - Update user (manual promise handling)
- `DELETE /users/:id` - Delete user (manual promise handling)

### Cookie Management

- `GET /set-cookie` - Set cookies (same as Express 5.x)
- `GET /get-cookies` - Retrieve current cookies

### Advanced Features

- `GET /search?q=query&page=1&limit=10` - Query parameters
- `POST /upload` - File upload simulation (requires multer)
- `GET /api/data` - Custom middleware demonstration
- `GET /products` - Products (separate route)
- `POST /products` - Create product (separate route)

## 🔧 Migration Checklist

When migrating from Express 4.x to Express 5.x:

### Dependencies

- [ ] Remove `body-parser` dependency
- [ ] Keep `cookie-parser` (still needed)
- [ ] Update `package.json` to include `"type": "module"`

### Code Changes

- [ ] Replace `require()` with `import` statements
- [ ] Replace `bodyParser.json()` with `express.json()`
- [ ] Replace `bodyParser.urlencoded()` with `express.urlencoded()`
- [ ] Convert route handlers to async/await
- [ ] Update error handling middleware
- [ ] Implement route chaining where beneficial

## 🚀 Migration Benefits

### Reduced Dependencies

- **Before**: `body-parser`, `cookie-parser`, `morgan`
- **After**: `cookie-parser`, `morgan` (body parsing built-in)

### Better Code Quality

- **Before**: Manual promise handling, callbacks
- **After**: Native async/await, cleaner code

### Enhanced Features

- **Before**: Basic error handling, limited routes
- **After**: Enhanced error context, route chaining

### Modern JavaScript

- **Before**: CommonJS modules
- **After**: ES modules with better tree-shaking

## 📚 Migration Resources

- [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html)
- [Express 5.x Documentation](https://expressjs.com/)
- [Express 5.x GitHub Repository](https://github.com/expressjs/express)

## 🎯 Use Cases

This application is perfect for:

- **Understanding Express 4.x patterns** before migration
- **Planning migration strategy** to Express 5.x
- **Comparing code patterns** between versions
- **Learning migration best practices**

## 📄 License

MIT License - feel free to use this code for learning and migration purposes.
