# 🚀 Deployment Configuration Guide

## 📋 Environment Variables Setup

### Backend (Render)

Go to your backend service on Render → **Environment** tab and add these variables:

```env
MONGO_URI=mongodb+srv://princekumar5252_db_user:prince123@fooddelivery.t8imisz.mongodb.net/Mobile_app?retryWrites=true&w=majority

PORT=5000

JWT_SECRET=sam

FRONTEND_URL=https://vehicle-validator-frontend-kdrzkogld.vercel.app

NODE_ENV=production
```

**Important Notes:**
- ✅ `MONGO_URI` - Your MongoDB Atlas connection string (already configured)
- ✅ `JWT_SECRET` - Secret key for JWT tokens (already configured)
- ✅ `PORT` - Render automatically provides PORT, but 5000 is backup
- ✅ `FRONTEND_URL` - Your Vercel frontend URL for CORS
- ✅ `NODE_ENV` - Set to production for deployment

---

### Frontend (Vercel)

Go to your Vercel project → **Settings** → **Environment Variables** and add:

```env
VITE_BASE_URL=https://vechile-validator-backend-im0r.onrender.com
```

**Important Notes:**
- ✅ Variable name **MUST** start with `VITE_` for Vite to recognize it
- ✅ This is your backend API URL deployed on Render
- ✅ After adding, redeploy your frontend

---

## 🔗 Your Deployment URLs

| Service | URL | Status |
|---------|-----|--------|
| **Backend API** | https://vechile-validator-backend-im0r.onrender.com | ✅ Live |
| **Frontend Web** | https://vehicle-validator-frontend-kdrzkogld.vercel.app | ✅ Live |
| **Repository** | https://github.com/prince62058/Assesment_Migration_RctNtv | ✅ Live |

---

## ✅ Configuration Checklist

### Backend (Render)
- [x] Service created and deployed
- [x] Environment variables added
- [x] CORS configured for frontend URL
- [x] MongoDB connected
- [x] API endpoints working

### Frontend (Vercel)
- [x] Project deployed
- [ ] Environment variable `VITE_BASE_URL` added
- [ ] Redeploy after adding env variable
- [ ] Test login/signup functionality
- [ ] Verify API calls working

---

## 🔄 How to Redeploy

### Backend (Render)
1. Go to: https://render.com/dashboard
2. Select your backend service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Or push to GitHub main branch (auto-deploys)

### Frontend (Vercel)
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **"Deployments"** → **"Redeploy"**
4. Or push to GitHub main branch (auto-deploys)

---

## 🧪 Testing After Deployment

### 1. Test Backend API
```bash
# Test health endpoint
curl https://vechile-validator-backend-im0r.onrender.com/

# Test login endpoint
curl -X POST https://vechile-validator-backend-im0r.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

### 2. Test Frontend
1. Visit: https://vehicle-validator-frontend-kdrzkogld.vercel.app
2. Try to login
3. Check browser console for errors
4. Verify API calls are going to backend

### 3. Check CORS
- Open browser DevTools → Network tab
- Try login/signup
- Should NOT see CORS errors
- If CORS error appears, check backend CORS configuration

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution:** 
1. Backend already configured with your Vercel URL
2. Make sure you pushed latest backend code
3. Redeploy backend on Render

### Issue: "Network Error" on Frontend
**Solution:**
1. Check `VITE_BASE_URL` is set in Vercel
2. Redeploy frontend after adding env variable
3. Verify backend URL is accessible

### Issue: Login Not Working
**Solution:**
1. Check MongoDB connection in Render logs
2. Verify JWT_SECRET is set
3. Check browser console for errors

### Issue: Environment Variables Not Working
**Solution:**
1. Make sure variable names are correct
2. For Vite, variables MUST start with `VITE_`
3. Redeploy after adding/changing env variables

---

## 📱 Mobile App Configuration

If you want to connect mobile app to deployed backend:

Update the API URL in your mobile app to:
```
https://vechile-validator-backend-im0r.onrender.com
```

---

## 🔐 Security Notes

- ✅ Never commit `.env` files to Git
- ✅ Use strong JWT_SECRET in production
- ✅ Keep MongoDB credentials secure
- ✅ CORS is configured to allow only your frontend
- ✅ Use HTTPS for all production URLs

---

## 📞 Support

If you face any issues:
1. Check Render logs for backend errors
2. Check Vercel logs for frontend errors
3. Check browser console for client-side errors
4. Verify all environment variables are set correctly

---

**Last Updated:** 2025-12-21
**Backend URL:** https://vechile-validator-backend-im0r.onrender.com
**Frontend URL:** https://vehicle-validator-frontend-kdrzkogld.vercel.app
