This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Comments API

Next.js 14 App Router API for creating and fetching comments using **Prisma (MongoDB)** and **Zod** validation.

### Endpoints

#### **POST `/api/comments`**
Create a new comment.

**Body:**
```json
{ "name": "Name", "email": "example@gmail.com", "comment": "This is a test comment." }
```

**Response:**
```json
{ "id": "...", "name": "Amanjeet", "email": "aman@vt.edu", "comment": "This is a test comment.", "createdAt": "..." }
```
---
#### **GET `/api/comments`**
Fetch 50 most recent comments (with pagination).
Offset - starting index (default 0)

**Example**
```bash
GET /api/comments
GET /api/comments?offset=50
```
**Response:**
```json
{ "items": [...], "offset": 50, "limit": 50, "total": 126 }
```
---
**Setup**
```bash
npm install
npx prisma generate
npm run dev
```