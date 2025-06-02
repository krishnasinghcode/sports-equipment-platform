
# Sports Website Backend Documentation

# Table of Contents
- [Project Planning](#project-planning)
  - [Folder Structure](#folder-structure)
  - [Api Endpoints](#Api-Endpoints)
  - [Data relations ](#Data-relations )
  - [Enverironment Variables](#environment-variables)


## Tech Stack

### Backend
- JavaScript – Core programming language for backend logic.
- Node.js – Runtime environment for executing JavaScript on the server.
- Express.js – Lightweight web framework for handling API requests.
- MongoDB – NoSQL database for storing application data.
- Git – Version control system for tracking code changes.
- JWT (JSON Web Token) Authentication – Secure user authentication and session management.

### Frontend
- HTML – Structure and layout of the web pages.
- CSS – Styling and design for a responsive UI.
- JavaScript – Dynamic behavior and interaction with the backend API.


## Folder Structure
```
backend/
├── controllers/
│   ├── admin/
│   │   ├── authController.js       # Admin-specific login/logout
│   │   ├── productController.js    # Add/edit/view/delete products for admins
│   ├── user/
│   │   ├── authController.js       # User-specific login/logout
│   │   ├── productController.js    # Product browsing, sorting, etc.
│   │   ├── cartController.js       # Manage user cart
├── models/
│   ├── Admin.js                   # Admin model
│   ├── Cart.js                    # Cart model
│   ├── Product.js                 # Product model
│   ├── User.js                    # User model
├── routes/
│   ├── admin/
│   │   ├── adminRoutes.js         # Admin-related routes
│   ├── user/
│   │   ├── authRoutes.js          # User authentication routes
│   │   ├── productRoutes.js       # Product filtering/sorting routes
│   │   ├── cartRoutes.js          # Cart management routes
├── middlewares/
│   ├── authMiddleware.js          # Auth/role-checking middleware
│   ├── errorHandler.js            # Global error handling middleware
├── utils/
│   ├── db.js                      # MongoDB connection
│   ├── logger.js                  # Logging utility
├── config/
│   ├── keys.js                    # Environment variables
├── seed/
│   ├── seedProducts.js            # Script for seeding initial product data
├── server.js                       # Main server entry point
```


## API Endpoints

This section outlines the available API routes for authentication, product management, and cart operations in the backend of the Sports Equipment Store.

---

### 🔐 Auth Routes

#### `POST /api/auth/signup`

Register a new user account.

#### `POST /api/auth/login`

Authenticate a user and return a JWT.

#### `POST /api/auth/verify`

Verify a newly registered user's account.

#### `POST /api/auth/verify-otp`

Send OTP for account verification.

#### `POST /api/auth/reset-password`

Send OTP to initiate a password reset.

#### `POST /api/auth/verify-reset-otp`

Verify OTP for password reset.

#### `PUT /api/auth/reset-password`

Reset the user's password using verified OTP.

#### `POST /api/auth/logout`

Log out the authenticated user and invalidate the session.

---

### 🛍️ Product Routes

#### Public Product Routes

These routes are accessible without authentication.

* **`GET /api/products/`**
  Retrieve all available products.

* **`GET /api/products/categories`**
  Get a list of all product categories.

* **`GET /api/products/category/:categoryName`**
  Get all products within a specific category.

* **`GET /api/products/:productId`**
  Retrieve details of a specific product.

#### Admin Product Routes (Requires Authentication)

Routes available for admin users to manage product inventory.

* **`GET /api/products/admin/`**
  Get all products added by the admin.

* **`GET /api/products/admin/:productId`**
  Get details of a specific admin-added product.

* **`POST /api/products/admin/`**
  Add a new product.

* **`PUT /api/products/admin/:productId`**
  Update an existing product.

* **`DELETE /api/products/admin/:productId`**
  Delete a product.

---

### 🛒 Cart Routes (Authenticated)

Routes to manage a user's shopping cart. JWT authentication is required.

#### `POST /api/cart/add`

Add a product to the cart.

**Request Body Example:**

```json
{
  "userId": "67ab22c0323bdaf6d46a7ed3",
  "productId": "6798f05ec3e01a6ab9b9f4ce",
  "quantity": 4
}
```

#### `GET /api/cart/:userId`

View the contents of a user's cart.

#### `POST /api/cart/reduce`

Reduce the quantity of a product in the cart.

**Request Body Example:**

```json
{
  "userId": "67ab22c0323bdaf6d46a7ed3",
  "productId": "6798f05ec3e01a6ab9b9f4ce",
  "quantity": 1
}
```

#### `DELETE /api/cart/remove`

Remove a specific product from the cart.

**Request Body Example:**

```json
{
  "userId": "67ab22c0323bdaf6d46a7ed3",
  "productId": "6798f05ec3e01a6ab9b9f4ce"
}
```

---

Let me know if you'd like to include request/response formats, status codes, or error handling conventions.



## Review routes

### Adding a new review
`http://localhost:5000/api/reviews/`
```
{
    "userId": "67ab22c0323bdaf6d46a7ed3",
    "productId": "d7956158-5ec7-4b74-900c-df87c1e786f4" ,
    "reviewText": "Very nice product!!!", 
    "reviewRating":"5"
}
```


## Environment Variables
Create a `.env` file in the root of your project and add the following variables:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sports_equipment
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
