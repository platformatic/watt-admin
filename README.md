# watt-admin

## CLI Tool

The project includes a command-line interface tool to check available Platformatic runtimes.

### Installation

After installing the project dependencies, you can run the tool directly:

```bash
./cli.js
```

The tool is also available as a binary when installed globally or linked:

```bash
npm link  # Link the package locally
watt-runtime  # Run the command
```

### Usage

The tool automatically discovers all available Platformatic runtimes. If multiple runtimes are found, it will prompt you to select one using an interactive menu.

```
$ watt-runtime
Select a runtime: (Use arrow keys)
❯ runtime-name (PID: 12345) (Started at 3/10/2025, 10:00:00 AM)
  another-runtime (PID: 54321) (Started at 3/10/2025, 9:30:00 AM)
```

If only one runtime is available, it will be automatically selected.

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
1. you should now see an info log like `Platformatic is now listening at http://127.0.0.1:{PORT}` (open the local URL)
2. click on link above to navigate the frontend app
3. you can call the backend by prefixing the local URL with `/api`
4. call the `/api/runtimes` endpoint (you should receive the PID)
5. call the `/api/runtimes/{pid}/metrics` endpoint
