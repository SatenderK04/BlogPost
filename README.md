# Basic Blog Website

A simple blog website with CRUD functionality, filtering, authentication, and search operations.

## Features

- 📝 **Create, Read, Update, Delete (CRUD)** blog posts
- 🔍 **Search** functionality to find specific posts
- 🔐 **User Authentication** (Login/Logout)
- 🔄 **Filter** posts based on categories or tags
- 📜 **EJS-based frontend** for dynamic rendering
- 📡 **MongoDB for database storage**

## Technologies Used

- **Frontend:** EJS, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Installation Guide

### Prerequisites

Ensure you have the following installed:

- **Node.js** (Download from [nodejs.org](https://nodejs.org/))
- **MongoDB** (Setup a local or cloud database from [MongoDB Atlas](https://www.mongodb.com/atlas))

### Steps to Run the Project

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SatenderK04/Blogpost.git
   cd Blogpost
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```sh
     MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.hrydr.mongodb.net/Blogpost?retryWrites=true&w=majority
     ```
4. **Start the server:**
   ```sh
   npm start
   ```
5. **Access the website:**
   Open `https://blogpost-iou0.onrender.com` in your browser.

## Future Enhancements

- 🛠️ **Add comments and likes on posts**
- 🏞️ **Upload images for blog posts**

---

🎉 **Enjoy Blogging!** 🚀

