# ArticleHub

ArticleHub is a React single-page application built with Vite.

## Run locally

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

In a second terminal, start the API server:

```sh
npm run server
```

The Vite development server forwards `/api` requests to `http://localhost:3001`. Form submissions, contact messages and user accounts are stored locally in `backend/data/`. Passwords are saved as salted hashes, never as plain text.

For production, set a long, random JWT signing secret before starting the API:

```powershell
$env:JWT_SECRET = 'replace-with-a-long-random-secret'
npm.cmd run server
```

In this Windows PowerShell environment, script execution is disabled for the `npm.ps1` shim. Use the command wrapper instead:

```powershell
npm.cmd run dev
```

## Checks

```sh
npm run build
npm run lint
```
