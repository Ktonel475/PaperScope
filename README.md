# PaperScope

PaperScope is a modern academic paper search and management web application template, built with [React (Vite)](https://vitejs.dev/), [Mantine UI](https://mantine.dev/), and a Node.js/Express backend (see [WebDB](https://github.com/Ktonel475/WebDB.git)) with Prisma ORM and PostgreSQL. This template is designed for educational, non-profit, or research group use.

---

## ✨ Features

- 🔍 **Search & Filter:** Find academic papers by keyword, author, tag, or year
- 📄 **Detailed Views:** See authors, abstract, tags, and downloadable files for each paper
- 🛠️ **Admin Dashboard:** Add, edit, or delete papers (admin only)
- 🔐 **User Authentication:** Secure admin access
- 📱 **Responsive UI:** Clean, modern interface with Mantine components

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (or use Docker. Please refer to [WebDB](https://github.com/Ktonel475/WebDB.git))
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```sh
git clone https://github.com/Ktonel475/PaperScope.git
cd PaperScope
```

### 2. Setup the Backend

See the [WebDB backend instructions](https://github.com/Ktonel475/WebDB.git) for API/database setup.

### 3. Setup the Frontend

1. Install dependencies:

   ```sh
   npm install
   ```
2. Start the frontend dev server:

   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

---

## 🖥️ Usage

- **Browse Papers:** Search, filter, and view paper details on the main page.
- **Admin Login:** Go to `/login` and log in with an admin account (see backend seed data for default credentials).
- **Admin Dashboard:** After login, access `/admin` to manage papers.

---

## 🎨 Customization

- Update the organization name and logo in [`src/components/header.jsx`](src/components/header.jsx).
- Modify paper fields or add new features by editing frontend components in [`src/pages`](src/pages).
- For backend model changes, see [`WebDB/prisma/schema.prisma`](https://github.com/Ktonel475/WebDB/blob/main/prisma/schema.prisma).

---

## 📂 Project Structure

```
PaperScope/
  src/
    components/    # Reusable UI components
    pages/         # Page components (home, detail, admin, etc.)
    App.jsx        # Main app routes
    main.jsx       # Entry point
    index.css      # Global styles
  vite.config.js   # Vite config (API proxy, etc.)
  package.json     # Project scripts and dependencies
```

---

## 📄 License

This project is for educational and non-commercial use. See [LICENSE](LICENSE) for details.

---

## 🙏 Credits

Built with [React](https://react.dev/), [Vite](https://vitejs.dev/)

PaperScope is a modern academic paper search and management web application template, built with React (Vite), Mantine UI, and a Node.js/Express backend with Prisma ORM and PostgreSQL. This template is designed for educational, non-profit, or research group use.
