# Customer Management API

This is a simple API for customer management with basic CRUD operations. It uses MongoDB as a NoSQL database and is documented using Swagger. Additionally, it includes performance testing scripts using K6.

## Setup

### Installation

Make sure you have Node.js and MongoDB installed on your machine.

1. Clone this repository:

````
git clone https://github.com/your-username/api-customers.git
cd api-customers
````

2. Install dependencies:

````
npm install
````

## Database Configuration

Ensure MongoDB is running. Edit the `app.js` file to adjust the database URL according to your setup.

````
// ...

mongoose.connect('mongodb://localhost:27017/yourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ...
````

## Running the API

Start the server:

````
node app.js
````

The API will be available at http://localhost:3000.

## Swagger Documentation

Access the Swagger documentation at http://localhost:3000/api-docs to explore and test the API endpoints.

## Testing the API with K6

Make sure you have K6 installed globally:

````
npm install -g k6
````

Run the performance test:

````
k6 run test.js
````

## Notes:
* Make sure to customize the API and database configuration according to your specific preferences.
* Adapt the test scripts as needed, including URLs, payloads, and test logic.

