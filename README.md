# Subscribe with CMP

> The template was bootstrapped by Buy CMP. 

This repository will provide a way for apps to create subscriptions that accept CMP. This starter kit is a fork of DappStarter. However it has been amended to connect with the caducueus blockchain.

This starter kit is composed of Next.js and Tailwind CSS, with ConnectKit, ethers, & wagmi for all your web3 needs. It uses Typescript and an opinionated directory structure for maximum dev confy-ness.

## Getting Started

First, install dependencies with `yarn install`. Then, initialize the env file with `cp .env.example .env`, and add your UTORG SID if you want to integrate UTORG. 

Finally, run the development server with `yarn dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses clerk.dev for authentication. 
And uses supabase for a postgresql database. 

### Clerk 
Clerk manages authentication for the entire app. There are logged in pages and there login functionality managed by the SignedIn and SignedOut components.

### Supabase
When you make changes to the schema in the supabase portal you have to re-generate the types by running the following command:

```
npm run generate-db-types
```

Or you can directly run the command:
```
npx supabase gen types typescript --project-id "iqbppcvxdaqzevqhhiid" --schema public > types/supabase.ts
```


## Learn More

To learn more about the components of this kit, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs/) - learn about Tailwind, and browse through the included classes.
-   [Ethers Documentation](https://docs.ethers.io/v5/) - learn about Ethers features and API.
-   [wagmi Documentation](https://wagmi.sh/) - learn about wagmi features and API.
-   [ConnectKit Documentation](https://docs.family.co/connectkit) - learn about ConnectKit's features and API.


## Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=m1guelpf-dapp-template&filter=next.js), from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This app is open-source and licensed under the MIT license. For more details, check the [License file](LICENSE).
