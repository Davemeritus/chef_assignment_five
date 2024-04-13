// Import necessary modules
import { register } from '../../src/services/auth_service.js';
import User from '../../src/database/schema/user_schema.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Define a test suite for the 'register' function
describe('register', () => {
  // Reset all mocks before each test to ensure test isolation
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: should register a new user
  it('should register a new user', async () => {
    // Define test data
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const password = 'password123';
    const confirmPassword = 'password123';
    const role = 'user';

    // Mock the User.findOne function to return null, indicating that the user does not exist
    jest.spyOn(User, 'findOne').mockResolvedValue(null);

    // Mock the bcrypt.hash function to return the hashed password
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

    // Mock the User.save function to return the new user
    const saveMock = jest.spyOn(User.prototype, 'save').mockResolvedValue({
      _id: 'generatedID', // Placeholder for dynamically generated ID
      name,
      email,
      password: 'hashedPassword',
      role,
    });

    // Call the function with the test data
    const newUser = await register(name, email, password, confirmPassword, role);

    // Assert that the mocks were called with the correct arguments
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(saveMock).toHaveBeenCalled();

    // Assert that the function returned the expected result
    expect(newUser).toEqual(expect.objectContaining({
      name,
      email,
      id: expect.any(String),
    }));
  });

  // Test case: should throw an error if the user already exists
  it('should throw an error if the user already exists', async () => {
    // Mock the User.findOne function to return a user, indicating that the user already exists
    jest.spyOn(User, 'findOne').mockResolvedValue({});

    // Define test data
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const password = 'password123';
    const confirmPassword = 'password123';
    const role = 'user';

    // Assert that the function throws the expected error
    await expect(register(name, email, password, confirmPassword, role)).rejects.toThrow(
      'user already exists',
    );
  });

  // Test case: should throw an error if the password does not match
  it('should throw an error if the password does not match', async () => {
    // Define test data
    const name = 'Johna Doe';
    const email = 'johnadoe@example.com';
    const password = 'password123';
    const confirmPassword = 'differentPassword';
    const role = 'user';

    // Assert that the function throws the expected error
    await expect(register(name, email, password, confirmPassword, role)).rejects.toThrow(
      'Password does not match',
    );
  });
});