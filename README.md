# 🛠️ XML Parsing & MongoDB Integration Project

**XML Parsing & MongoDB Integration**  
This project allows you to parse XML files, convert them to JSON, and store the data in a MongoDB database. It's for managing large datasets and integrating them into modern applications. 

---

## 📋 Table of Contents
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Features
- Parse XML files and convert them to JSON format.
- Store and manage data in a MongoDB database.
- API endpoints for CRUD operations.
- Secure authentication using JWT tokens.
- Efficient error handling and logging.

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
`$ npm install`
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