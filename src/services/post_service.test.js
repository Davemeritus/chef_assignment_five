// Import the necessary modules and functions
import {
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost,
    createPost,
  } from "./post_service.js";
  import Post from "../database/schema/post_schema.js";
  import mongoose from "mongoose";
  
  // Mock the Post schema to simulate database operations
  jest.mock("../database/schema/post_schema.js", () => {
    return jest.fn().mockImplementation(() => {
      return {
        save: jest.fn().mockResolvedValue(true),
        populate: jest.fn().mockResolvedValue({
          title: 'Test Title',
          body: 'Test body',
          user: 'Test User'
        })
      };
    });
  });
  
  // Mock the static methods of the Post schema
  jest.mock("../database/schema/post_schema.js", () => {
    return {
      find: jest.fn().mockResolvedValue([]),
      findById: jest.fn().mockResolvedValue(null),
      findByIdAndUpdate: jest.fn().mockResolvedValue(null),
      findByIdAndDelete: jest.fn().mockResolvedValue(null),
    };
  });
  
  // Define a test suite for the post service
  describe("Post Controller", () => {
    // Clear all mocks before each test to ensure test isolation
    beforeEach(() => {
      Post.find.mockClear();
      Post.findById.mockClear();
      Post.findByIdAndUpdate.mockClear();
      Post.findByIdAndDelete.mockClear();
    });
  
    // Test case: getAllPosts retrieves posts successfully
    it("getAllPosts retrieves posts successfully", async () => {
      // Mock the chained methods of the Post.find function
      Post.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            skip: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue(["post1", "post2"]),
            }),
          }),
        }),
      });
  
      // Call the function with test data
      const posts = await getAllPosts({
        limit: 10,
        page: 1,
        order: "desc",
        orderBy: "createdAt",
      });
  
      // Assert that the function returned the expected result and the mock was called
      expect(posts.length).toBe(2);
      expect(Post.find).toHaveBeenCalled();
    });
  
    // Test case: getSinglePost retrieves a post successfully
    it("getSinglePost retrieves a post successfully", async () => {
      // Mock the Post.findById function
      Post.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue("singlePost"),
      });
  
      // Call the function with test data
      const post = await getSinglePost("someId");
  
      // Assert that the function returned the expected result and the mock was called
      expect(post).toBe("singlePost");
      expect(Post.findById).toHaveBeenCalled();
    });
  
    // Test case: updatePost updates a post successfully
    it("updatePost updates a post successfully", async () => {
      // Mock the Post.findByIdAndUpdate function
      Post.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue("updatedPost"),
      });
  
      // Call the function with test data
      const post = await updatePost("someId", { title: "New Title" });
  
      // Assert that the function returned the expected result and the mock was called
      expect(post).toBe("updatedPost");
      expect(Post.findByIdAndUpdate).toHaveBeenCalled();
    });
  
    // Test case: deletePost deletes a post successfully
    it("deletePost deletes a post successfully", async () => {
      // Mock the Post.findByIdAndDelete function
      Post.findByIdAndDelete.mockReturnValue({
        populate: jest.fn().mockResolvedValue("deletedPost"),
      });
  
      // Call the function with test data
      const post = await deletePost("someId");
  
      // Assert that the function returned the expected result and the mock was called
      expect(post).toBe("deletedPost");
      expect(Post.findByIdAndDelete).toHaveBeenCalled();
    });
  
    // Test case: createPost creates a post successfully
    it("createPost creates a post successfully", async () => {
      // Mock the Post.prototype.save function
      Post.prototype.save = jest.fn().mockResolvedValue("newPost");
  
      // Call the function with test data
      const post = await createPost("Test Title", "Test Body", "Test User");
  
      // Assert that the function returned the expected result and the mock was called
      expect(post).toBe("newPost");
      expect(Post.prototype.save).toHaveBeenCalled();
    });
  });