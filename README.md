# 🛠️ XML Parsing & MongoDB Integration Project

**XML Parsing & MongoDB Integration**  

---

## 📋 Table of Contents
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)


---

## 🌟 Features
**Project Overview**  
This project is designed to parse data from a specific XML file, convert it to JSON format, and insert it into a MongoDB database upon sending a request to the `/import` endpoint. The `Name` field of each product is required to start with an uppercase letter; otherwise, the request will be rejected.

**Key Features**
- **Dynamic Field Management**: The fields `isDiscount`, `Active`, and `updatedAt` in the `Product` model are dynamically updated based on the data provided.
- **Model Structure**:
  - **User**: Handles user authentication and authorization using JWT.
  - **Product**: Manages product data with fields like `StockCode`, `Description`, `Price`, etc.
- **Conditional Product Insertion**: 
  - When inserting a specific product, the system checks the `StockCode` to determine if the product already exists.
  - If the product does not exist, it will be added to the database.
  - If the product already exists, an error message will be returned.
- **Data Parsing**: Parses and extracts data from a predefined XML format and converts it into JSON format for further processing.

---

## 🛠️ Technologies Used
- **Node.js** - Server-side runtime.
- **Express.js** - Web framework.
- **MongoDB** - NoSQL database.
- **Mongoose** - MongoDB object modeling tool.
- **JWT** - Authentication using JSON Web Tokens.
- **bcrypt.js** - Password hashing for user authentication.
- **xml2js** - XML to JSON conversion.

---

## ⚙️ Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (local)
- [Git](https://git-scm.com/)

# Install all the project dependencies

### Clone the Repository
```bash
git clone https://github.com/your-username/xml-parsing-mongo-node.git
cd xml-parsing-mongo-node 
```
## 🔧 Configuration
Add a .env at main project.
```ruby
MONGO_URI=mongodb://localhost:27017/your_database
PORT=4000 JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```
## 🚀 Usage
Follow these steps to get the project up and running:
1. **Install dependencies**:
 ```ruby
npm install
```
2. **To Convert XML file to JSON. After running it in the command line, products.json is created.**
  ```ruby
python src/XML2JSON/xmlToJson.py
``` 
3. **By running this command, automatically restart every time you make changes to your code, so you don't have to stop and start it manually. This makes your development process faster and more efficient.**
  ```ruby
npx nodemon src/index.js
``` 
## 📊 API Endpoints
**Products**
*{{url}} =http://localhost:PORT*
* GET /api/products - Get all products
* GET /api/products/:stockCode - Get a specific product by StockCode
* POST /api/products/add - Add a new product
* PUT /api/products/:stockCode - Update a product

**User**
* POST /api/auth/register -User Register
* POST /api/auth/login - User Login

> [!NOTE]
The token received with user login should be sent to Headers as:
**Key: Authorization**
**Value: Token Value**

**You can import the Postman collection for testing the API. Use the JSON file in the Postman folder.**

