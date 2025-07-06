🚀 B2B Tender Management Platform
A simple full-stack web application that allows companies to manage their profiles, create and apply to tenders, and discover other businesses.

📌 Walk Through Demo (On Loom)
- https://www.loom.com/share/93c211ed766c41af90f140caf27dc0db?sid=459d84a4-2352-463a-8881-25690d2a2b88

📌 Key Features
✅ User signup, login, and logout (with session-based auth)

🏢 Company profile creation and editing (with logo/image upload)

📄 Tender creation, listing, update, and delete (CRUD)

📥 Apply to tenders and view all proposals

🔍 Search companies by name, industry, or services

🛠️ Tech Stack
Backend:

Node.js, Express.js

MongoDB with Mongoose

express-session for auth

bcrypt for password hashing

Frontend:

React.js (with Vite)

File Upload:

Cloudinary (to store company logos)

Session Store:

In-memory (for demo only – not ideal for production)

⚙️ Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/lakshrajkumar26/tender-management-platform.git
cd tender-management-platform
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file and add:

env
Copy
Edit
SESSION_SECRET=your_secret
CLOUDINARY_URL=your_cloudinary_url
MONGODB_URI=your_mongodb_uri
Then run the backend:

bash
Copy
Edit
node index.js
3. Frontend Setup (Optional but recommended)
bash
Copy
Edit
cd ../frontend
npm install
npm start
🔗 API Overview
🔐 Auth
POST /user/register – Register new user

POST /user/login – Login user

POST /user/logout – Logout user

🏢 Company
POST /company/register – Create a company profile

GET /company/companies – View all companies

GET /company/search?name=&industry=&services= – Search companies

GET /company/:id – View a specific company

📄 Tender
POST /tender/ – Create a new tender

GET /tender/ – List tenders (paginated)

GET /tender/:id – View tender details

PUT /tender/:id – Update a tender

DELETE /tender/:id – Delete a tender

📥 Applications
POST /application/submit – Apply to a tender

GET /application/tender/:tenderId – View all applications for a tender

👶 Notes for Beginners
Always wrap async code in try/catch blocks to catch errors.

Keep your routes organized and modular.

Use tools like Postman to test APIs as you build.

Cloudinary makes image upload super easy—just grab the URL and save it in MongoDB.

This is not production-ready. For real apps, consider using MongoDB Atlas, Redis for session store, and proper error logging.
# Loom Link for Demo Walk Through
- https://www.loom.com/share/93c211ed766c41af90f140caf27dc0db?sid=31087ef8-d857-4974-bff2-0f7c1bfe1cbc
# FrontEnd On Vercel
- https://vercel.com/lakshrajkumar26s-projects/b2bproject
- # Backend On Railway
- https://b2b-tender-production.up.railway.app/
