# 🏢 Meeting Room Booking System

ระบบจองห้องประชุม (Meeting Room Booking System) พัฒนาด้วย **Next.js (Fullstack Framework)** และ **MySQL** สำหรับจัดการการจองห้อง ตรวจสอบสถานะ และบริหารตารางการใช้งาน

---

## 📌 Overview

ระบบนี้ถูกออกแบบมาเพื่อช่วยให้ผู้ใช้งานสามารถ:

* ตรวจสอบห้องว่าง
* จองห้องประชุม
* ดูตารางการใช้งาน

พัฒนาโดยใช้ **Next.js** ซึ่งรองรับทั้ง Frontend และ Backend (API Routes) ภายในโปรเจกต์เดียว

---

## 🚀 Features

### 👤 User Features

* ดูรายการห้องประชุม
* ตรวจสอบสถานะห้องว่าง
* จองห้องประชุม
* ดูประวัติการจอง

### 🛠️ Admin Features

* เพิ่ม / แก้ไข / ลบ ห้องประชุม
* จัดการการจอง
* ตรวจสอบตารางการใช้งาน

---

## 🛠️ Tech Stack

| Category  | Technology           |
| --------- | -------------------- |
| Framework | Next.js (App Router) |
| Language  | TypeScript           |
| Database  | MySQL                |
| Styling   | Tailwind CSS         |
| Backend   | Next.js API Routes   |

---

## 🧱 System Architecture

* Next.js (Frontend + API Routes)
* MySQL Database

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash id="jjuo1r"
git clone https://github.com/yourusername/meeting_room.git
cd meeting_room
```

---

### 2️⃣ Install Dependencies

```bash id="a7d7m3"
npm install
```

---

### 3️⃣ Setup Environment

สร้างไฟล์ `.env.local`:

```env id="q9fjrd"
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=meeting_room
```

---

### 4️⃣ Run Development Server

```bash id="vkjq91"
npm run dev
```

เปิด:

````
http://localhost:3000
``` id="q0d3cc"

---

## 🔗 API Example

### Get All Rooms
``` id="1z0gxq"
GET /api/rooms
````

### Create Booking

```id="dy1rsg"
POST /api/bookings
```

---

## 👨‍💻 My Responsibilities

* พัฒนา Fullstack ด้วย Next.js
* ออกแบบและพัฒนา API Routes
* เชื่อมต่อฐานข้อมูล MySQL
* ออกแบบ UI ด้วย Tailwind CSS
* จัดการ Logic ระบบจองห้อง

---

## 📷 Screenshots

> (เพิ่มรูป UI จะช่วยเพิ่มความน่าสนใจ)

---

## 🔮 Future Improvements

* 🔐 Authentication (Login / Register)
* 📅 Calendar View สำหรับการจอง
* 🔔 Notification แจ้งเตือน
* 📊 Dashboard สำหรับ Admin

---

## ⭐ Notes

โปรเจกต์นี้พัฒนาเพื่อฝึกทักษะ Fullstack Development โดยใช้ Next.js เป็นหลัก
