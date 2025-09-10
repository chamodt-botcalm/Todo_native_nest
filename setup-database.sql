-- Create database
CREATE DATABASE IF NOT EXISTS todoapp;

-- Use the database
USE todoapp;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isCompleted BOOLEAN DEFAULT FALSE,
    dueDate DATETIME NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    userId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_todos_userId ON todos(userId);
CREATE INDEX idx_todos_isCompleted ON todos(isCompleted);
CREATE INDEX idx_todos_priority ON todos(priority);
CREATE INDEX idx_todos_createdAt ON todos(createdAt);