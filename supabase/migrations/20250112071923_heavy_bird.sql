/*
  # Initial Database Schema for AccraLife

  1. Tables
    - users: Store user information and authentication details
    - locations: Store location information
    - categories: Store location categories
    - reviews: Store user reviews for locations
    - images: Store location images
    - bookmarks: Store user bookmarks
    - admin_logs: Track admin activities

  2. Security
    - Passwords are hashed using bcrypt
    - Foreign key constraints for data integrity
    - Indexes for optimized queries
*/

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS locations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(255),
  email VARCHAR(255),
  website VARCHAR(255),
  facebook VARCHAR(255),
  instagram VARCHAR(255),
  twitter VARCHAR(255),
  opening_hours JSON,
  features JSON,
  menu_url VARCHAR(255),
  entry_fee DECIMAL(10, 2),
  dress_code TEXT,
  parking_info TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  status ENUM('active', 'inactive', 'pending') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  location_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  location_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  location_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE,
  UNIQUE KEY unique_bookmark (user_id, location_id)
);

CREATE TABLE IF NOT EXISTS admin_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  action VARCHAR(255) NOT NULL,
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for better query performance
CREATE INDEX idx_locations_category ON locations(category_id);
CREATE INDEX idx_locations_status ON locations(status);
CREATE INDEX idx_reviews_location ON reviews(location_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_location ON bookmarks(location_id);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Restaurants', 'restaurants', 'Find the best dining spots in Accra'),
('Clubs', 'clubs', 'Discover Accra\'s vibrant nightlife'),
('Tourist Sites', 'tourist-sites', 'Explore historical and cultural landmarks');