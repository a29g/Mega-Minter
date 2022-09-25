The end result is deployed in Vercel. You can access the webpage of this project through this [link](mega-minter.vercel.app).
Give it a try with metamask on Rinkby testnet.

# About
NFT Drop Website where you can sign in with your Metamask wallet and be able to mint and claim 1 on 1 NFT Tokens.

# Run in your local machine steps

Clone the project in your local 

First, intall the required dependencies:
```
npm install
or
yarn install
```
Then, run the development server:

```
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

On `pages/_app.tsx`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our hooks to work.

on `pages/index.tsx`, you'll find the `useMetamask` hook that we use to connect the user's wallet to MetaMask, `useDisconnect` that we use to disconnect it, and `useAddress` to check the user's wallet address once connected.

# Built With

- [NextJS](https://nextjs.org/) - The React Framework
  for Production.
  - Server Side Rendering
- [TailwindCSS 3](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML
- [TypeScript](https://www.typescriptlang.org/) - TypeScript is JavaScript with syntax for types.
  Intuitive SDKs and widgets for developers.
- [Thirdweb](https://thirdweb.com/) - Smart contracts you control. Tools that accelerate your workflow.
- [Sanity](https://www.sanity.io/) - Sanity.io is the unified content platform that powers better digital experiences.
  - Query data using GROQ query language
  - Add data to Sanity CMS Backend from the frontend using Mutations
  - Ability to BAN a tweet via the Sanity Platform
- [React Hot Toast](https://react-hot-toast.com/) - Smoking hot React notifications.
