# Smart Printing Service for Students

The Smart Printing Service for Students project offers an intelligent printing service for students, enabling convenient management, uploading, and printing of documents. The application leverages React, Vite, and TypeScript for the frontend (FE).

This project uses FastAPI for the backend (BE) and [uv](https://docs.astral.sh/uv/getting-started/installation/#standalone-installer) as the package manager. To get started, follow the instructions below.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation Guide](#installation-guide)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Running the Project](#running-the-project)
  - [Running the Frontend](#running-the-frontend)
  - [Running the Backend](#running-the-backend)
- [Makefile Commands](#makefile-commands)

---

## Features

- **User-friendly Interface**: Simplified design for easy navigation.
- **Fast Backend**: High-performance data processing with FastAPI.
- **Customizable Printing Options**: Configure settings like paper size, color, and more.
- **Convenient Uploads**: Drag-and-drop or direct document uploads supported.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.

---

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast development and build tool.
- **TypeScript**: Strongly typed JavaScript for improved code reliability.

### Backend
- **FastAPI**: A high-performance web framework written in Python.

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (version 22)
- **Python** (version 3.12.4)
- **npm**
- **Make** (for Makefile commands)

---

## Installation Guide

### Clone the Repository

```bash
git clone https://github.com/chezzijr/hcmut_ssps
cd hcmut_spss
```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install pip dependencies:
   ```bash
   pip install -r requirements.txt
   ```

---

## Running the Project

### Running the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the application in your browser at `http://localhost:5173`.

### Running the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Start the backend server:
   ```bash
   make dev
   ```
3. The API will be accessible at `http://127.0.0.1:8000`.

---

## Makefile Commands

In the **backend** directory, the following Makefile commands are available:

- `make uv sync`: Create a virtual environment and install dependencies.
- `make dev`: Start the development server.
- `make run`: Start the production server.
- `make test`: Run tests.
