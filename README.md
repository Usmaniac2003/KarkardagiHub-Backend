
# **KarkardagiHub**

KarkardagiHub is a full-stack web application designed to manage and send announcements. It includes features for user registration, login, role-based navigation, and AI-generated content for announcements. The app consists of a React frontend and an Express backend with a focus on authentication and secure API access.

---

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [CORS Configuration](#cors-configuration)
- [Authentication](#authentication)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## **Project Overview**

KarkardagiHub allows users to create and send AI-generated email announcements with role-based access for admins, managers, and staff. The application integrates AI for generating content and uses secure authentication mechanisms to manage user roles and data access.

---

## **Features**

- **User Authentication**: Register, login, and logout functionality.
- **Role-Based Navigation**: Navigation tailored based on the user's role (Admin, Manager, Staff).
- **AI Content Generation**: AI-powered text generation for creating email announcements.
- **Email Sending**: Ability to send announcements to specified recipients.
- **CORS Configuration**: Secure cross-origin resource sharing setup to enable frontend-backend communication.
- **Responsive UI**: Modern UI built with React and Material UI components.

---

## **Technologies Used**

- **Frontend**:
  - React.js
  - Material UI
  - Axios (for making API requests)
  - React Router (for navigation)
  - Vite (for development server)
  
- **Backend**:
  - Node.js
  - Express.js
  - Nodemailer (for sending emails)
  - Bcrypt.js (for password hashing)
  - JWT (JSON Web Tokens for authentication)
  - MongoDB (for user data and role management)

- **Others**:
  - CORS (for managing cross-origin requests)
  - dotenv (for managing environment variables)

---

## **Frontend Setup**

To get started with the frontend, clone the repository and install dependencies.

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/karkardagihub.git
    cd karkardagihub/frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

   The frontend should now be available at `http://localhost:5173`.

---

## **Backend Setup**

To set up the backend, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/karkardagihub.git
    cd karkardagihub/backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the `backend` directory and add your environment variables (replace `yourvalue` with actual values):

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/karkardagihub
    JWT_SECRET=yoursecretkey
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your-email@gmail.com
    SMTP_PASS=your-email-password
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

   The backend should now be running on `http://localhost:3000`.

---

## **CORS Configuration**

The backend is set up to allow CORS (Cross-Origin Resource Sharing) between the React frontend and the Express backend. The CORS configuration ensures that requests from your frontend (e.g., `http://localhost:5173`) can access the backend resources. 

Here's the configuration:

```javascript
const allowedOrigins = [
  'https://karkardagihub.netlify.app', // Production URL
  'http://localhost:5173',             // Development URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'), false); // Reject the request
    }
  },
  credentials: true, // Allow credentials (cookies)
}));
```

---

## **Authentication**

Authentication is handled using **JWT (JSON Web Tokens)** and **bcrypt** for password hashing.

- **Login**: Users can log in by providing their credentials (email and password). The server returns a JWT token upon successful login.
- **Register**: New users can register by providing a username, email, and password. The password is hashed before storing in the database.
- **Protected Routes**: Access to protected routes requires the user to provide a valid JWT token in the `Authorization` header.

---

## **Usage**

Once the frontend and backend are set up, you can:

1. Register a new user (either as Admin, Manager, or Staff).
2. Log in with the credentials.
3. Generate and view AI-based content for announcements.
4. Send generated announcements via email to specified recipients.
5. Logout or refresh the page to reset the user session.

---

## **API Documentation**

### **POST /api/auth/register**

Registers a new user.

#### Request Body:
```json
{
  "username": "JohnDoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### Response:
```json
{
  "user": {
    "_id": "1234567890",
    "username": "JohnDoe",
    "email": "johndoe@example.com",
    "role": "admin"
  },
  "token": "jwt_token_here"
}
```

### **POST /api/auth/login**

Logs in an existing user and returns a JWT token.

#### Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### Response:
```json
{
  "user": {
    "_id": "1234567890",
    "username": "JohnDoe",
    "email": "johndoe@example.com",
    "role": "admin"
  },
  "token": "jwt_token_here"
}
```

### **POST /api/announcements**

Generates AI content for announcements.

#### Request Body:
```json
{
  "prompt": "Generate an announcement for a new product launch"
}
```

#### Response:
```json
{
  "data": "We are excited to announce the launch of our new product..."
}
```

### **POST /api/send-email**

Sends an email to a recipient.

#### Request Body:
```json
{
  "recipients": "recipient@example.com",
  "subject": "New Product Launch",
  "text": "We are excited to announce the launch of our new product..."
}
```

---

## **Testing**

To run tests for the backend, ensure you have the required testing frameworks set up:

1. Install testing dependencies:
    ```bash
    npm install --save-dev jest supertest
    ```

2. Run the tests:
    ```bash
    npm test
    ```

---

## **Deployment**

For deployment, you can use platforms like **Heroku**, **Netlify**, or **Vercel**.

1. For the **frontend**: Deploy the React app to Netlify or Vercel.
2. For the **backend**: Deploy the Node.js app to Heroku or any other cloud provider.

---

## **Contributing**

Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Open a pull request.

Please ensure that all code follows the project's coding style and includes tests for new features.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

By following this `README.md` structure, you provide a well-organized and clear documentation for developers or users who want to work with your project. Make sure to replace placeholders (like URLs) with actual values for your project.