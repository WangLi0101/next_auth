# My Demo

## Login Features

This project implements a clean and beautiful login page that supports third-party login through GitHub and Google accounts.

### Features

- Supports GitHub OAuth login
- Supports Google OAuth login
- Beautiful UI interface (using Tailwind CSS)

### Usage

Visit <http://localhost:3000/login> to see the login page.

### Configuration

Before using, you need to create OAuth applications on GitHub and Google developer platforms and get Client ID:

1. Replace the following in the `services/auth.ts` file:
   - `YOUR_GITHUB_CLIENT_ID` - Replace with your GitHub OAuth application ID
   - `YOUR_REDIRECT_URI` - Replace with your application callback address
   - `YOUR_GOOGLE_CLIENT_ID` - Replace with your Google OAuth application ID

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
