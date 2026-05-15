-- ================================================================
-- TRAVEL GO – Database Schema
-- SQL Server
-- ================================================================

-- Bảng địa điểm du lịch
CREATE TABLE destinations (
  id          INT           IDENTITY(1,1) PRIMARY KEY,
  name        NVARCHAR(200) NOT NULL,
  location    NVARCHAR(300) NOT NULL,
  description NVARCHAR(MAX),
  image_url   NVARCHAR(500),
  badge       NVARCHAR(100),        -- VD: "Đà Nẵng", "Hà Nội"
  rating      DECIMAL(2,1)  DEFAULT 0,
  is_active   BIT           DEFAULT 1,
  created_at  DATETIME      DEFAULT GETDATE(),
  updated_at  DATETIME      DEFAULT GETDATE()
);

-- Bảng món ăn
CREATE TABLE foods (
  id          INT           IDENTITY(1,1) PRIMARY KEY,
  name        NVARCHAR(200) NOT NULL,
  origin      NVARCHAR(200),        -- Vùng miền
  description NVARCHAR(MAX),
  image_url   NVARCHAR(500),
  price_range NVARCHAR(100),        -- VD: "20.000 - 50.000đ"
  category    NVARCHAR(100),        -- VD: "Cơm", "Phở", "Bánh"
  is_active   BIT           DEFAULT 1,
  created_at  DATETIME      DEFAULT GETDATE(),
  updated_at  DATETIME      DEFAULT GETDATE()
);

-- Bảng đồ uống
CREATE TABLE drinks (
  id          INT           IDENTITY(1,1) PRIMARY KEY,
  name        NVARCHAR(200) NOT NULL,
  icon        NVARCHAR(10),         -- Emoji icon
  description NVARCHAR(MAX),
  image_url   NVARCHAR(500),
  price_range NVARCHAR(100),
  is_active   BIT           DEFAULT 1,
  created_at  DATETIME      DEFAULT GETDATE(),
  updated_at  DATETIME      DEFAULT GETDATE()
);

-- Bảng người dùng
CREATE TABLE users (
  id            INT           IDENTITY(1,1) PRIMARY KEY,
  full_name     NVARCHAR(200) NOT NULL,
  email         NVARCHAR(200) NOT NULL UNIQUE,
  password_hash NVARCHAR(500) NOT NULL,
  role          NVARCHAR(50)  DEFAULT 'user',  -- 'user' | 'admin'
  is_active     BIT           DEFAULT 1,
  created_at    DATETIME      DEFAULT GETDATE()
);

-- Bảng lịch trình du lịch
CREATE TABLE trip_plans (
  id          INT           IDENTITY(1,1) PRIMARY KEY,
  user_id     INT           REFERENCES users(id),
  title       NVARCHAR(300) NOT NULL,
  start_date  DATE,
  end_date    DATE,
  total_cost  DECIMAL(15,0) DEFAULT 0,
  notes       NVARCHAR(MAX),
  is_active   BIT           DEFAULT 1,
  created_at  DATETIME      DEFAULT GETDATE(),
  updated_at  DATETIME      DEFAULT GETDATE()
);

-- Bảng các điểm dừng trong lịch trình
CREATE TABLE trip_stops (
  id              INT           IDENTITY(1,1) PRIMARY KEY,
  trip_plan_id    INT           NOT NULL REFERENCES trip_plans(id) ON DELETE CASCADE,
  stop_order      INT           NOT NULL,    -- Thứ tự điểm dừng
  stop_name       NVARCHAR(300) NOT NULL,
  stop_type       NVARCHAR(100),             -- 'destination'|'food'|'drink'|'custom'
  estimated_cost  DECIMAL(15,0) DEFAULT 0,
  notes           NVARCHAR(MAX),
  destination_id  INT           REFERENCES destinations(id),
  created_at      DATETIME      DEFAULT GETDATE()
);

-- Bảng tin nhắn liên hệ
CREATE TABLE contact_messages (
  id          INT           IDENTITY(1,1) PRIMARY KEY,
  full_name   NVARCHAR(200) NOT NULL,
  email       NVARCHAR(200) NOT NULL,
  message     NVARCHAR(MAX) NOT NULL,
  status      NVARCHAR(50)  DEFAULT 'pending',  -- 'pending'|'read'|'replied'
  created_at  DATETIME      DEFAULT GETDATE()
);