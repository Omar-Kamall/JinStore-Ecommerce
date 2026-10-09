# 🛒 Jinstore - E-Commerce Platform

A scalable, high-performance E-Commerce backend & frontend platform built using a **Modular Monolith** architecture with **NestJS**, **TypeORM**, **PostgreSQL**, and **Next.js**.

---

## 🏗️ Architecture Overview

The backend is structured as a **Modular Monolith**, ensuring clean separation of concerns, high maintainability, and an easy path to microservices if needed in the future.

```text
jinstore/
├── backend/                  # NestJS REST API Server
│   ├── src/
│   │   ├── config/           # Database, Swagger, & App Configs
│   │   ├── modules/          # Core Domain Modules (Users, Auth, Products, etc.)
│   │   ├── common/           # Shared Guards, Interceptors, Filters & DTOs
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env                  # Environment Variables
│   └── package.json
│
├── frontend/                 # Next.js Web Application
│   ├── src/
│   │   ├── app/              # App Router Pages & Layouts
│   │   ├── components/       # Reusable UI Components
│   │   ├── services/         # API Service Layer
│   │   └── types/            # TypeScript Interfaces
│   ├── .env.local
│   └── package.json
│
├── .gitignore
└── README.md