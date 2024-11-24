# Blog App

A feature-rich blog application where users can create, edit, update, and manage blogs with cover images. The app supports multiple users and leverages modern web technologies to deliver a secure, responsive, and intuitive blogging experience.

---

## Features

### User Authentication

- Secure user registration and login using **JWT tokens** stored in cookies.
- Passwords are hashed with **bcryptjs** for enhanced security.

### Create, Edit, and Manage Blog Posts

- Users can create blogs with titles, summaries, detailed content, and optional cover images.
- Authors can edit or update their blogs seamlessly.

### Blog Cover Images

- Blogs feature optional cover images uploaded via **Multer**.

### Responsive Design

- Fully responsive interface optimized for desktop, tablet, and mobile devices.

### Secure and Scalable

- Powered by **MongoDB** for efficient and reliable data storage.
- Authentication is handled with **JWT tokens** and cookies.

---

## Tech Stack

### Frontend

- **React.js**: For building a dynamic and responsive user interface.
- **Tailwind CSS**: For clean and efficient styling.
- **React Router DOM**: For client-side routing and navigation.
- **React Quill**: For rich text editing functionality.
- **React Icons**: For adding scalable icons.

### Backend

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Lightweight and flexible server framework.
- **MongoDB**: NoSQL database for storing user and blog data.
- **Multer**: Middleware for handling file uploads (e.g., cover images).

### Additional Libraries

- **bcryptjs**: For securely hashing and validating passwords.
- **jsonwebtoken**: For implementing secure JWT-based authentication.
- **dotenv**: For managing environment variables.

---

## Key Features in Detail

### JWT and Cookies

- User sessions are secured with **JWT tokens** stored in cookies.
- Persistent authentication ensures users remain logged in even after refreshing the page.

### Blog Cover Images

- Users can enhance their blogs with cover images.
- Image uploads are handled securely using **Multer** middleware.

### Role-Based Access

- Only the author of a blog can edit or delete it, ensuring secure management of posts.

---
