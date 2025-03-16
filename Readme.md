# Note Easy

## Overview
**Note Easy** is a simple yet powerful note-taking application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It allows users to create, search, and organize notes with categories and tags. Users can sign in to manage their notes effectively.

## Features
- 📝 **Create Notes**
- 🔍 **Search Notes** by title, content, and tags
- 📂 **Categorize Notes** (Work, Personal, Ideas, Tasks)
- 🏷️ **Filter by Tags**
- 📅 **Sort Notes** (Newest, Oldest, Title, Category)
- 🔐 **User Authentication** (Sign In/Sign Out)

## Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS, Lucide Icons
- **State Management:** React Context API
- **Authentication:** Custom Auth Provider
- **UI Components:** Flowbite, DaisyUI

## Installation
### Prerequisites
- Node.js & npm/yarn installed

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/note-easy.git
   cd note-easy
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. Open in browser: `http://localhost:3000`

## Folder Structure
```
📂 note-easy
├── 📁 components       # UI components (Auth, Notes, User, etc.)
├── 📁 context          # Auth & Notes Providers
├── 📁 pages            # Next.js pages (Home, Auth, etc.)
├── 📁 styles           # Tailwind styles
├── 📜 package.json     # Dependencies & scripts
└── 📜 README.md        # Project documentation
```

## Usage
1. **Sign In / Sign Up** (If authentication is enabled)
2. **Create a Note** by clicking "+ New Note"
3. **Search & Filter** using the search bar and category/tags
4. **Switch View** between List and Grid
5. **Edit or Delete Notes** using note actions

## Responsive Header
The header includes:
- **Search Bar**, **Add Note Button**, and **User Authentication** controls
- Uses `grid` on small screens and `flex` on larger screens for responsiveness

## Contributing
Feel free to fork, submit issues, or open PRs to improve Note Easy!

## License
MIT License

