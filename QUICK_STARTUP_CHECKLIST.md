# 🚀 Quick Development Environment Startup Checklist

**Use this checklist each time you start your development session*\

## ✅ **Step-by-Step Startup Checklist**

### **1. Start pgAdmin 4** 📊

- [ ] **Launch pgAdmin 4** from Start Menu or desktop
- [ ] **Enter master password** (if prompted)
- [ ] **Connect to AWS RDS** server (should be saved from previous setup)
- [ ] **Verify connection** - Expand to see `users` and `memes` tables

### **2. Prepare Environment** 🔧

- [ ] **Open terminal/command prompt**
- [ ] **Navigate to project**: `cd C:/Users/cassa/Documents/meme-gallery-api`
- [ ] **Check .env file** has your actual password (not placeholder)

### **3. Start Your Server** 🖥️

- [ ] **Run command**: `npm start`
- [ ] **Wait for success messages**:

  Server is running at [http://localhost:3000]
  ✅ Successfully connected to PostgreSQL database
  ✅ Server connected to PostgreSQL database

- [ ] **If you see errors** - check the troubleshooting guide

### **4. Open Postman** 📡

- [ ] **Launch Postman** (desktop app or web)
- [ ] **Select environment**: "Local Development"
- [ ] **Verify baseURL**: Should be `http://localhost:3000`

### **5. Quick Functionality Test** 🧪

- [ ] **Test in browser**: Visit `http://localhost:3000`
  - Should show: "Meme Gallery API By Cassandra Moore"
- [ ] **Test in Postman**: GET `{{baseURL}}/memes`
  - Should return: JSON array with your memes
- [ ] **Check database**: Refresh memes table in pgAdmin
  - Should show: Same data as Postman response

---

## ⚠️ **Common Issues & Quick Fixes**

### **Server Won't Start (Port in use)**

```bash
# Kill existing process and restart
taskkill //F //IM node.exe
npm start
```

### **Database Connection Failed**

1. **Check internet connection**
2. **Verify .env password** is your real password, not placeholder
3. **Test pgAdmin connection first**

### **Postman Not Working**

1. **Confirm server is running** (check terminal messages)
2. **Try browser first**: `http://localhost:3000`
3. **Check URL**: Should be `http` not `https`

---

## 🎯 **You're Ready When:**

- ✅ pgAdmin shows your database tables
- ✅ Server terminal shows "Successfully connected" messages  
- ✅ Postman GET /memes returns data
- ✅ Browser shows your API homepage

**Time to code!
