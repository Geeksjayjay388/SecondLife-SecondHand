# 🎒 SecondLife – SecondHand

**SecondLife – SecondHand** is a full-stack MERN application designed to empower university students to buy and sell second-hand items within their campus community. It simplifies peer-to-peer commerce, promotes sustainability, and fosters a culture of resourcefulness.

Built with precision, scalability, and user experience in mind, this project demonstrates advanced integration of modern web technologies, secure backend architecture, and responsive UI design.

---

## 🚀 Key Features

- 🏠 **Home Page** – Displays all active listings with real-time updates and dynamic filtering
- 📤 **Upload Page** – Allows students to post items with:
  - Item name and description
  - Price and location
  - Contact information (email or phone)
  - Image upload with preview
- 🔍 **Search & Filter** – Enables users to find items by category, price range, or location
- 📱 **Mobile-Responsive Design** – Optimized for all screen sizes using Tailwind CSS
- 🔐 **Secure Data Handling** – Input validation, sanitized uploads, and optional JWT-based authentication
- 🧾 **RESTful API** – Built with Express and Mongoose for clean, scalable data operations
- 🌍 **Cloud Integration** – MongoDB Atlas for database hosting, with optional image storage via Cloudinary or Firebase

---

## 🧰 Tech Stack

| Layer       | Technology Used                                      |
|-------------|------------------------------------------------------|
| Frontend    | React 19, Tailwind CSS, Framer Motion, React Router |
| Backend     | Node.js, Express                                     |
| Database    | MongoDB, Mongoose                                    |
| Auth        | JWT (optional)                                       |
| Dev Tools   | Vite, Git, VS Code                                   |
| Hosting     | Vercel / Render / MongoDB Atlas                      |

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Geeksjayjay388/SecondLife-SecondHand.git
cd SecondLife-SecondHand

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Start the development server
npm run dev
