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

### Test the frontend app

1. run the server
2. open the browser and go to `http://localhost:3042/`
3. click on `/admin` link
4. this is the frontend app!

### Test the backend app

1. run the server
2. open the browser and go to `http://localhost:3042/`
3. click on "OpenAPI Documentation" link (`http://localhost:3042/documentation/json`)
4. call the `/api/runtimes` endpoint
5. call the `/api/runtimes/{id}/metrics` endpoint
