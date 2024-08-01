This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Services

- Redis/Queue: [Upstash](https://upstash.com) will be needed for their Qstash
  queue service and for their Redis serverless. Create a new Redis DB and a
  Qstash queue and put the variables in the env file.
- Proxy: I like [IPRoyal](https://iproyal.com) for proxy. This helps with
  scraping a lot, but it's optional.
- Database: I like [Neon](https://neon.tech) for serverless Posgres.

## Development

### Install all the dependencies

```bash
npm i
```

### Setup your database with Prisma

First, initialize:

```bash
npx prisma init
```

### Setup Cloudflare Tunnel

For local development, you can set up a Cloudflare tunnel that you can call from
airtable. I like
[the instructions here](https://kirillplatonov.com/posts/setting-up-cloudflare-tunnel-for-development/).

You'll need to be a Cloudflare user with a domain pointing there (it's free to
use their DNS servies). **If you want to use another tunnel service, go for it.
This doesn't matter except for testing.**

#### Setup the CLI

```bash
brew install cloudflare/cloudflare/cloudflared
```

Then:

```
cloudflared tunnel login
```

#### Create the Tunnel

```bash
cloudflared tunnel create <Tunnel-NAME>
```

After that, point the subdomain to the tunnel:

```bash
cloudflared tunnel route dns <Tunnel-NAME> <SUBDOMAIN>
```

#### Setup the Tunnel in the App

First, **create a new folder at the root of the app called `.cloudflared`**.

Second, on your computer, find `~/.cloudflared/<Tunnel-UUID>.json` and copy that
file to the `.cloudflared` folder we just created. **After it's copied, make
sure you rename it `credentials.json`.**

Third, create a file in that folder called `config.yml` with the following info:

```yml
tunnel: <Tunnel-UUID>
credentials-file: .cloudflared/credentials.json
noTLSVerify: true
```

Finally, give `bin/tunnel` execute permissions:

```bash
chmod +x bin/tunnel
```

#### Run Your Tunnel

Assuming your app is already running (if it's not, `npm run dev`), then all you
need to do is run:

```bash
bin/tunnel <port>
```

For example, if it's running on 3000 (default) you would run `bin/tunnel 3000`
in a new terminal window and everything should be good to go. Test it out by
going to the domain you entered and you should see the homepage for the app (it
just says "airtable helpers" if you haven't changed anything).

### Run dev server

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.
