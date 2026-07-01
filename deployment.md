# EcoBot – Deployment Guide

EcoBot is a full-stack Node.js + React application. It is designed to run with **zero external configurations or API keys**. The chatbot operates on a local keyword engine, and the data layers rely on a local file-based JSON store.

Below is the step-by-step process to build and deploy the application.

---

## 🏗️ Prerequisites & Local Build Verification

Before deploying, ensure the application builds correctly locally:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Verify Production Build**:
   Compile the frontend assets (using Vite) and the backend Express server (using esbuild):
   ```bash
   npm run build
   ```
   This generates:
   - A compiled React static bundle in `dist/`
   - A compiled backend server file at `dist/server.cjs`

3. **Verify Local Run**:
   Launch the production build locally:
   ```bash
   npm run start
   ```
   The application should be accessible on `http://localhost:3000`.

---

## 💾 Important: Data Persistence

EcoBot uses a file-based database stored in the `.data/` directory at the root of the project.
> [!IMPORTANT]
> When deploying to platforms with ephemeral file systems (like standard Heroku or Render containers without disk attachments), any changes to the database (e.g., new tips, admin reports, quiz scoreboard entries) will be lost when the instance restarts or updates.
> 
> **To retain data, you should mount a persistent volume/disk at the path `/app/.data` (or the folder path where the application is deployed).**

---

## 🚀 Deployment Options

Choose one of the options below to deploy the application.

### Option 1: Render (Web Service)

Render is one of the easiest ways to deploy full-stack Node applications.

1. Create a new **Web Service** on [Render](https://render.com/).
2. Connect your Git repository.
3. Configure the following service settings:
   - **Environment**: `Node`
   - **Region**: Choose the closest region to your users.
   - **Branch**: `main` (or your active branch)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. *(Optional but Recommended for Persistence)*:
   - Scroll down to the **Disks** section.
   - Click **Add Disk**.
   - **Name**: `ecobot-data`
   - **Mount Path**: `/app/.data` (assuming your project root is `/app`)
   - **Size**: `1 GiB` (more than enough for JSON database collections)
5. Click **Create Web Service**.

---

### Option 2: Railway

Railway is a fast, developer-friendly cloud platform.

1. Sign in to [Railway](https://railway.app/).
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Select your EcoBot repository.
4. Railway will automatically detect the Node.js project.
5. *(Optional but Recommended for Persistence)*:
   - Go to the service settings.
   - Under the **Volumes** tab, click **Add Volume**.
   - Mount path: `/app/.data`
6. Click **Deploy**.

---

### Option 3: Docker (Any Cloud Provider / VPS)

You can run EcoBot anywhere that supports Docker.

1. Create a `Dockerfile` in the root of the repository:
   ```dockerfile
   FROM node:20-slim AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   FROM node:20-slim
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --only=production
   COPY --from=builder /app/dist ./dist
   EXPOSE 3000
   ENV NODE_ENV=production
   CMD ["node", "dist/server.cjs"]
   ```

2. Build and run the Docker image:
   ```bash
   docker build -t ecobot .
   docker run -p 3000:3000 -v ecobot-data:/app/.data ecobot
   ```
   *(Note the `-v ecobot-data:/app/.data` flag which mounts a persistent volume for the JSON database).*

---

### Option 4: Linux Virtual Private Server (VPS)

For deploying on services like AWS EC2, DigitalOcean, or Linode:

1. Clone your repository onto the server.
2. Ensure Node.js (v18+) is installed.
3. Install production dependencies and build:
   ```bash
   npm install
   npm run build
   ```
4. Install **PM2** to run the app in the background and survive server reboots:
   ```bash
   sudo npm install -g pm2
   pm2 start dist/server.cjs --name "ecobot"
   pm2 save
   pm2 startup
   ```
5. Set up a reverse proxy like **Nginx** to route domain traffic (port 80/443) to port 3000.
