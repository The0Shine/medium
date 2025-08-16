const axios = require('axios');

const BASE_URL = 'http://localhost:4000/api/auth';

async function testRegister() {
    console.log('\n🧪 Testing User Registration...');
    
    const userData = {
        first_name: 'Test',
        last_name: 'User',
        email: 'testuser@example.com',
        username: 'testuser123',
        password: 'password123'
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/register`, userData);
        console.log('✅ Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.log('❌ Registration failed:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        return null;
    }
}

async function testLogin() {
    console.log('\n🧪 Testing User Login...');
    
    const loginData = {
        username: 'testuser123',
        password: 'password123'
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/login`, loginData);
        console.log('✅ Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.log('❌ Login failed:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        return null;
    }
}

async function testLoginWithExistingUser() {
    console.log('\n🧪 Testing Login with existing user...');
    
    // Thử với user đã có trong database (từ seeders)
    const loginData = {
        username: 'admin',
        password: 'admin123'
    };
    
    try {
        const response = await axios.post(`${BASE_URL}/login`, loginData);
        console.log('✅ Login with existing user successful:', response.data);
        return response.data;
    } catch (error) {
        console.log('❌ Login with existing user failed:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        return null;
    }
}

async function runTests() {
    console.log('🚀 Starting Auth API Tests...');
    
    // Test 1: Register new user
    await testRegister();
    
    // Test 2: Login with new user
    await testLogin();
    
    // Test 3: Login with existing user
    await testLoginWithExistingUser();
    
    console.log('\n✅ All tests completed!');
}

runTests();
