# 🚀 Render Frontend Deployment Guide

## Backend URL
```
https://vechile-validator-backend-im0r.onrender.com
```

---

## Render Static Site Deployment Configuration

### Step 1: Create New Static Site

1. Go to: https://render.com/dashboard
2. Click **"New +"** button
3. Select **"Static Site"**

### Step 2: Connect Repository

1. Click **"Connect a repository"**
2. Select: `prince62058/Assesment_Migration_RctNtv`
3. Click **"Connect"**

---

## Configuration Settings

### Basic Settings:

| Field | Value |
|-------|-------|
| **Name** | `vehicle-validator-frontend` (or any name) |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `frontend/dist` |

---

### Environment Variables:

Click **"Advanced"** → **"Add Environment Variable"**

| Key | Value |
|-----|-------|
| `VITE_BASE_URL` | `https://vechile-validator-backend-im0r.onrender.com` |

---

### Auto-Deploy:

✅ Enable **"Auto-Deploy"** - Yes (deploys automatically on git push)

---

## Complete Step-by-Step Process

### 1. Login to Render
- Go to: https://render.com
- Login with GitHub account

### 2. Create Static Site
- Dashboard → Click **"New +"**
- Select **"Static Site"**

### 3. Connect Repository
- Click **"Connect a repository"**
- If first time: Authorize Render to access GitHub
- Select: `prince62058/Assesment_Migration_RctNtv`
- Click **"Connect"**

### 4. Configure Deployment

**Name:** `vehicle-validator-frontend`

**Branch:** `main`

**Root Directory:** `frontend`

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
frontend/dist
```

### 5. Add Environment Variables

Click **"Advanced"** button, then scroll to **"Environment Variables"**

Click **"Add Environment Variable"**

- **Key:** `VITE_BASE_URL`
- **Value:** `https://vechile-validator-backend-im0r.onrender.com`

### 6. Deploy

- Review all settings
- Click **"Create Static Site"**
- Wait 3-5 minutes for deployment
- Your site will be live at: `https://vehicle-validator-frontend.onrender.com`

---

## Important Notes

### ⚠️ Root Directory
Make sure to set **Root Directory** to `frontend` otherwise build will fail.

### ⚠️ Publish Directory
The publish directory should be `frontend/dist` (not just `dist`) because we're using a root directory.

### ⚠️ Build Command
Use `npm install && npm run build` to ensure dependencies are installed before building.

---

## Post-Deployment

### Custom Domain (Optional)
1. Go to your static site dashboard
2. Click **"Settings"** → **"Custom Domains"**
3. Add your domain
4. Follow DNS configuration instructions

### Redeploy
- Automatic: Push to `main` branch
- Manual: Dashboard → Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## Troubleshooting

### Build Fails - "Module not found"
**Solution:** Check that Root Directory is set to `frontend`

### Build Fails - "Command not found"
**Solution:** Make sure Build Command is: `npm install && npm run build`

### Blank Page After Deployment
**Solution:** Check Publish Directory is `frontend/dist`

### API Calls Failing
**Solution:** Verify `VITE_BASE_URL` environment variable is set correctly

### 404 on Page Refresh
**Solution:** Add `_redirects` file (see below)

---

## Additional Configuration Files

### Create _redirects file for React Router

This ensures React Router works properly on Render.
