# Note Easy

## Website

```
https://noteeasy-d8d7d.web.app/
```

## Overview
**Note Easy** is a simple yet powerful note-taking application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It allows users to create, search, and organize notes with categories and tags. Users can sign in to manage their notes effectively.

## Features
- 📝 **Create Notes**
- 🔍 **Search Notes** by title, content, and tags
- 📂 **Categorize Notes** (Work, Personal, Ideas, Tasks)
- 🏷️ **Filter by Tags**
- 📅 **Sort Notes** (Newest, Oldest, Title, Category)
- 🔐 **User Authentication** (Sign In/Sign Out)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Earth123456789/NoteEasy.git
   cd NoteEasy
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

### Docker Setup

1. Build DockerImage:

```sh
docker build -t noteeasy-app .
```

2. Start the development server:

```sh
docker run -p 3000:3000 noteeasy-app
```

3. Open in browser: `http://localhost:3000`
