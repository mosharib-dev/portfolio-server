# Portfolio – Backend (Node.js + Express + MongoDB)

REST API backend for the portfolio contact form and admin dashboard.

## 🗂️ Folder Structure

```
server/
├── models/
│   └── Contact.js        # Mongoose schema for contact messages
├── routes/
│   ├── contact.js        # POST /api/contact
│   └── admin.js          # POST /api/admin/login, GET/PATCH/DELETE /api/admin/messages
├── middleware/
│   └── auth.js           # JWT verification middleware
├── index.js              # Express app entry point
├── .env.example          # Copy this to .env and fill values
└── package.json
```

## 🚀 Local Setup

```bash
cd server
npm install
cp .env.example .env    # then fill in your values (see below)
npm run dev             # runs on http://localhost:5000
```

## ⚙️ Environment Variables (.env)

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=any_long_random_string_you_choose
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=mohammadmosharib03@gmail.com
ADMIN_PASSWORD=choose_your_admin_password
```

### How to get MONGO_URI (MongoDB Atlas):
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → create free M0 cluster
2. Database Access → Add User (username + password, save both)
3. Network Access → Add IP → Allow from Anywhere (0.0.0.0/0)
4. Cluster → Connect → Drivers → copy the connection string
5. Replace `<password>` with your DB user password
6. Replace `/?retryWrites` with `/portfolio?retryWrites` (sets DB name)

## 📬 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | ❌ | Health check |
| POST | `/api/contact` | ❌ | Submit contact form |
| POST | `/api/admin/login` | ❌ | Admin login → returns JWT token |
| GET | `/api/admin/messages` | ✅ JWT | Get all contact messages |
| PATCH | `/api/admin/messages/:id/read` | ✅ JWT | Mark message as read |
| DELETE | `/api/admin/messages/:id` | ✅ JWT | Delete a message |

## 🌐 Deployment (Render)

1. Push this folder to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Instance Type:** Free
5. Environment → add all variables from `.env` (with production values)
6. Click **Deploy Web Service**
7. Wait ~3 min → you'll get a URL like `https://portfolio-server-xxxx.onrender.com`

> ⚠️ Free Render instances spin down after 15 min of inactivity. First request after sleep takes ~30 seconds.

## 📦 Tech Stack

- Node.js + Express
- Mongoose + MongoDB Atlas
- JSON Web Tokens (jsonwebtoken)
- bcryptjs
- dotenv
- cors
- nodemon (dev)
