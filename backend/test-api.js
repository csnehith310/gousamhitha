// Simple test script to verify API endpoints
const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
    console.log('Testing CB Organic API...\n');

    // Test 1: Get Categories
    try {
        console.log('1. Testing GET /api/categories');
        const response = await fetch(`${API_BASE_URL}/categories`);
        const data = await response.json();
        console.log('✓ Categories:', data.categories?.length || 0, 'found');
    } catch (error) {
        console.log('✗ Categories failed:', error.message);
    }

    // Test 2: Get Products
    try {
        console.log('\n2. Testing GET /api/products');
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();
        console.log('✓ Products:', data.products?.length || 0, 'found');
    } catch (error) {
        console.log('✗ Products failed:', error.message);
    }

    // Test 3: Get Orders
    try {
        console.log('\n3. Testing GET /api/orders');
        const response = await fetch(`${API_BASE_URL}/orders`);
        const data = await response.json();
        console.log('✓ Orders:', data.orders?.length || 0, 'found');
    } catch (error) {
        console.log('✗ Orders failed:', error.message);
    }

    // Test 4: Get Vendors
    try {
        console.log('\n4. Testing GET /api/vendors');
        const response = await fetch(`${API_BASE_URL}/vendors`);
        const data = await response.json();
        console.log('✓ Vendors:', data.vendors?.length || 0, 'found');
    } catch (error) {
        console.log('✗ Vendors failed:', error.message);
    }

    console.log('\n✓ API tests complete!');
}

// Run tests
testAPI();
