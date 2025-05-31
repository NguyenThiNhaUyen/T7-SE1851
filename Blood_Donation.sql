CREATE DATABASE Blood

CREATE TABLE Roles (
  id INT PRIMARY KEY IDENTITY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255), -- Hashed password (bcrypt, SHA-256, etc.)
  role_id INT,
  enable BIT,
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (role_id) REFERENCES Roles(id)
);

CREATE TABLE UserProfile (
  user_id INT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  dob DATE,
  gender VARCHAR(10),
  blood_type VARCHAR(3),
  address VARCHAR(255),
  phone VARCHAR(20),
  last_donation_date DATE,
  recovery_time INT,
  location VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE BloodTypes (
  type VARCHAR(3) PRIMARY KEY,
  description VARCHAR(100) NOT NULL
);

CREATE TABLE BloodComponents (
  id INT PRIMARY KEY IDENTITY,
  name VARCHAR(50)
);

CREATE TABLE CompatibilityRules (
  id INT PRIMARY KEY IDENTITY,
  donor_type VARCHAR(3),
  recipient_type VARCHAR(3),
  component_id INT,
  is_compatible BIT,
  FOREIGN KEY (donor_type) REFERENCES BloodTypes(type),
  FOREIGN KEY (recipient_type) REFERENCES BloodTypes(type),
  FOREIGN KEY (component_id) REFERENCES BloodComponents(id)
);

CREATE TABLE DonationRegistrations (
  id INT PRIMARY KEY IDENTITY,
  user_id INT,
  ready_date DATE,
  status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Donations (
  id INT PRIMARY KEY IDENTITY,
  user_id INT,
  registration_id INT,
  donation_date DATE,
  blood_type VARCHAR(3),
  component_id INT,
  volume_ml INT,
  location VARCHAR(255),
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (registration_id) REFERENCES DonationRegistrations(id),
  FOREIGN KEY (blood_type) REFERENCES BloodTypes(type),
  FOREIGN KEY (component_id) REFERENCES BloodComponents(id)
);

CREATE TABLE BloodUnits (
  id INT PRIMARY KEY IDENTITY,
  blood_type VARCHAR(3),
  component_id INT,
  donation_id INT,
  quantity_ml INT,
  expiration_date DATE,
  status VARCHAR(50),
  stored_at DATETIME,
  FOREIGN KEY (blood_type) REFERENCES BloodTypes(type),
  FOREIGN KEY (component_id) REFERENCES BloodComponents(id),
  FOREIGN KEY (donation_id) REFERENCES Donations(id)
);

CREATE TABLE BloodInventory (
  id INT PRIMARY KEY IDENTITY,
  blood_type VARCHAR(3),
  component_id INT,
  total_quantity_ml INT,
  last_updated DATETIME,
  FOREIGN KEY (blood_type) REFERENCES BloodTypes(type),
  FOREIGN KEY (component_id) REFERENCES BloodComponents(id)
);

CREATE TABLE BloodRequests (
  id INT PRIMARY KEY IDENTITY,
  requester_id INT,
  blood_type VARCHAR(3),
  component_id INT,
  quantity_ml INT,
  urgency_level VARCHAR(20),
  status VARCHAR(20),
  created_at DATETIME,
  FOREIGN KEY (requester_id) REFERENCES Users(id),
  FOREIGN KEY (component_id) REFERENCES BloodComponents(id)
);

CREATE TABLE Transfusions (
  id INT PRIMARY KEY IDENTITY,
  recipient_id INT,
  request_id INT,
  blood_unit_id INT,
  transfusion_date DATETIME,
  status VARCHAR(20),
  notes TEXT,
  FOREIGN KEY (recipient_id) REFERENCES Users(id),
  FOREIGN KEY (request_id) REFERENCES BloodRequests(id),
  FOREIGN KEY (blood_unit_id) REFERENCES BloodUnits(id)
);

CREATE TABLE Blogs (
  id INT PRIMARY KEY IDENTITY,
  title VARCHAR(255),
  author_id INT,
  content TEXT,
  created_at DATETIME,
  status VARCHAR(20),
  FOREIGN KEY (author_id) REFERENCES Users(id)
);

CREATE TABLE Notifications (
  id INT PRIMARY KEY IDENTITY,
  user_id INT,
  content TEXT,
  sent_at DATETIME,
  [read] BIT,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE VnPayPayments (
  id INT PRIMARY KEY IDENTITY,
  user_id INT,
  amount DECIMAL(10,2),
  payment_time DATETIME,
  transaction_code VARCHAR(100),
  status VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);