
const { test, expect, request } = require('@playwright/test')
import fs from 'fs';
import path from 'path';

const loginPayload = { userEmail: "chand7272@gmail.com", userPassword: "Ramesh#12345" };
const orderpayload = {
    orders: [{country: "India",productOrderedId: "6960eac0c941646b7a8b3e68"}]};

const getAllProductsPayload = {
  productName: "",
  minPrice: 0,maxPrice: 50000,
  productCategory: [],productSubCategory: [],
  productFor: []
};



let token;
let orderId;
let productOrderId;
let message;
let userId;
// Base URL from Rahul Shetty Academy client app API
const BASE_URL = 'https://rahulshettyacademy.com/api/ecom';

test.beforeAll(async () => {

    //Create API context for making API requests
    const apiContext = await request.newContext();
    const apiResponse = await apiContext.post(`${BASE_URL}/auth/login`,
        {
            data: loginPayload
        }
    )
    expect(apiResponse.status()).toBe(200);
    const apiResponseJson = await apiResponse.json();
    token = apiResponseJson.token;
    userId = apiResponseJson.userId;

});


// 2. Get All Products (after auth)
test('API 02 - Get all products', async ({ request }) => {

console.log(`Token: ${token}`);
  const response = await request.post(`${BASE_URL}/product/get-all-products`, 
    {
        data: getAllProductsPayload,
        headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
  });

  // Basic status checks
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const json = await response.json();

  // 1. Top-level structure
  expect(json).toHaveProperty('count');
  expect(json).toHaveProperty('data');
  expect(json).toHaveProperty('message');
  expect(json.message).toBe('All Products fetched Successfully');


  // 2. Count consistency (very important!)
  expect(typeof json.count).toBe('number');
  expect(json.count).toBeGreaterThanOrEqual(0);
  expect(json.count).toBe(json.data.length); // ← detects most common bugs

  // 4. Validate each product object
  json.data.forEach((product, index) => {
    // Required fields
    expect(product, `Product at index ${index} missing _id`).toHaveProperty('_id');
    expect(product, `Product at index ${index} missing productName`).toHaveProperty('productName');
    expect(product, `Product at index ${index} missing productPrice`).toHaveProperty('productPrice');
    expect(product, `Product at index ${index} missing productCategory`).toHaveProperty('productCategory');
    expect(product, `Product at index ${index} missing productSubCategory`).toHaveProperty('productSubCategory');

    // Data type & value checks
    expect(typeof product._id).toBe('string');
    expect(typeof product.productName).toBe('string');
    expect(product.productName).not.toBe('');
    
    expect(typeof product.productPrice).toBe('number');
    expect(product.productPrice).toBeGreaterThan(0); // realistic price

    expect(['electronics', 'household', 'fashion']).toContain(product.productCategory); // adjust allowed values
    expect(['mobiles', 'shirts', 'laptops']).toContain(product.productSubCategory);     // adjust as needed

    // Optional but useful
    expect(product.productStatus).toBe(true);           // assuming active products
    expect(product.productRating).toMatch(/^\d+$/);     // string digit
    expect(product.productImage).toMatch(/^https:\/\//); // valid URL start


    // 5. Business / content rules (custom to your app)
  const productNames = json.data.map(p => p.productName);
  console.log('Product names found:', productNames);

  // Example: check for expected products (if you know what should be there)
  expect(productNames).toContain('ADIDAS ORIGINAL');
  expect(productNames).toContain('ZARA COAT 3');

  // Check for duplicates if business rule forbids them
  const uniqueNames = new Set(productNames);
  console.log('Unique product names count:', uniqueNames.size);
//   expect(uniqueNames.size).toBe(productNames.length); // no duplicates
  });

});


test('Verify order creation API', async ({ request }) => {

    console.log(`Token: ${token}`);
    //Create API for order creation and passing to the test case
    const orderResponse = await request.post(`${BASE_URL}/order/create-order`,
        {
            data: orderpayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    expect(orderResponse.status()).toBe(201);
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
    // productOrderId =orderResponseJson.productOrderId[0];
    message = orderResponseJson.message;


     const orderDetailsResponse = await request.get(`${BASE_URL}/order/get-orders-details?id=${orderId}`,
        {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
    
   
        expect(orderDetailsResponse.status()).toBe(200);
        const orderDetailsResponseJson = await orderDetailsResponse.json();
        const orderDetailsData = orderDetailsResponseJson.data;
        console.log(orderDetailsData);
        expect(orderDetailsResponseJson.message).toBe('Orders fetched for customer Successfully');
        expect(orderDetailsResponseJson.data.productName).toBe("ZARA COAT 3");
    

        const orderdeleteResponse = await request.delete(`${BASE_URL}/order/delete-order/${orderId}`,
        {
            headers: { Authorization: token,
                'Content-Type': 'application/json' }
        })  

        expect(orderdeleteResponse.status()).toBe(200);
        const orderdeleteResponseJson = await orderdeleteResponse.json();
        expect(orderdeleteResponseJson.message).toBe('Orders Deleted Successfully'); 
    
});
 



test('E-commerce API flow: Login and Add Product with file upload', async ({ request }) => {
 
  // Step 2: Add Product (multipart/form-data with file upload)
  //const imagePath = path.resolve(__dirname, 'D:\PlayWrightAutomation\testfile\adidas.jpg'); // ← Put your image in a 'files' folder (or update path)
  const imagePath = path.join(process.cwd(), 'test-data', 'adidas.jpg');
  const addProductResponse = await request.post('https://rahulshettyacademy.com/api/ecom/product/add-product', {
    headers: {
        Authorization: token
    },
    multipart: {
      productName: 'adidas shoes',
      productAddedBy: userId,               // From login response
      productCategory: 'fashion',
      productSubCategory: 'shirts',
      productPrice: 11500,                  // Number is fine; Playwright converts to string
      productDescription: 'Adidas Originals',
      productFor: 'women',
      productImage: {
          name: 'adidas.jpg',
          mimeType: 'image/jpeg',
          buffer: fs.readFileSync(imagePath)
        }
    }
  });

  
  const addProductBody = await addProductResponse.json();
  console.log('Add Product Response Body:', addProductBody);
  expect(addProductResponse.ok()).toBeTruthy();
  console.log('Product added:', addProductBody);

  let productId = addProductBody.productId;
  // Common assertion from this API
  expect(addProductBody.message).toBe('Product Added Successfully');



  const deleteProductResponse = await request.delete(`https://rahulshettyacademy.com/api/ecom/product/delete-product/${productId}`,
     {headers: { 
         Authorization: token,
         'Content-Type': 'application/json'
    }});

  expect(deleteProductResponse.ok()).toBeTruthy();
  const deleteProductBody = await deleteProductResponse.json();
  console.log('Delete Product Response Body:', deleteProductBody);
  expect(deleteProductBody.message).toBe('Product Deleted Successfully');
});