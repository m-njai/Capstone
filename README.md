Smart Timber Construction

An AI-powered web platform that streamlines timber cost estimation, inventory management, supplier integration, and project tracking for the construction industry.

🚀 Overview

The construction sector faces inefficiencies in timber procurement, cost planning, inventory tracking, and compliance. Smart Timber Construction offers a modern, digital solution to automate these workflows using AI, real-time APIs, and modern UI components.

🎯 Key Features

🔢 Timber Cost Estimation:** Calculate costs based on material type, dimensions, and supplier rates.
📦 Inventory Management:** Monitor stock levels and receive low-stock alerts.
🧾 Supplier Orders:** Place and track orders with verified suppliers.
🧱 Project Management:** Kanban, Gantt, Calendar, and Overview dashboards with task tracking.
🧠 AI Chat Assistant:** Interactive chatbot to support on-site and remote workers.
♻️ Sustainability Dashboard:** Track Green Star ratings, FSC-certified materials, and compliance status.
📊 Financial Planning Module:** Track income/expenses, generate monthly reports, and manage budgets.
📬 CRM & Newsletter:** Lead forms, subscriber dashboard, and Mailchimp integration.
🧾 Invoice Management:** Generate, email, and track invoice statuses with PDF/CSV export.
🧑‍💼 User Profile & Roles:** Role-based access control (Admin, Manager, Builder, etc.) with profile editing.
📁 Project Showcase:** Upload past construction projects with tags, filters, and gallery views.
🧱 Architecture

Frontend:** React.js + Tailwind CSS + Framer Motion
Backend: Node.js + Express.js
Database:** MongoDB (with Mongoose) + Firebase Auth
Hosting:** Vercel (frontend) + Render/Railway (backend)
Cloud Services:** Firebase Storage, Mailchimp, mangoose DB,
Dev Tools:** Postman, Swagger UI, Trello, Figma
📦 Project Structure

/smart-timber-frontend ├── src/ │ ├── components/ # Reusable UI components │ ├── pages/ # Page views for modules │ ├── photos/ # Image assets │ └── App.js # App router & layout

/smart-timber-backend ├── models/ # MongoDB models ├── routes/ # Express route handlers ├── controllers/ # Business logic ├── middleware/ # Auth, validation, etc. └── server.js # Entry point

🛠️ Installation Guide

Prerequisites

Node.js ≥ 18
MongoDB (Local or Atlas)
Firebase Project & Auth enabled
Vercel/Netlify account (for frontend hosting)
