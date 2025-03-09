# watt-admin

## Project setup

```
npm install && cp .env.sample .env
```

### Build

```
npm run build
```

### Start

```
npm run start
```

### Dev Mode

This will auto-reload both the backend and frontend when changes are made.

```
npm run dev
```

### Navigate the app

0. check you started `watt-admin`
1. you should now see an info log like `Platformatic is now listening at http://127.0.0.1:57523` (open the local URL)
2. click on `/admin` link to navigate the frontend app
3. you can call the backend by prefixing the local URL with `/api`
4. call the `/api/runtimes` endpoint (you should receive the PID)
5. call the `/api/runtimes/{pid}/metrics` endpoint
