# 🔌 Watt Admin

**Real-time monitoring and administration for your Platformatic applications**

Watt Admin is an open-source developer monitoring tool that provides instant visibility into your Node.js services. Monitor performance, analyze logs, and troubleshoot issues—all from a single, intuitive dashboard.

![Watt Admin Dashboard](https://blog.platformatic.dev/content/images/2025/01/CleanShot-2025-01-15-at-15.50.54@2x.png)

## ✨ Features

### 📊 **Performance Metrics**
- **Memory tracking**: RSS, heap usage, new/old space allocation with interactive charts
- **CPU monitoring**: Real-time CPU and event loop utilization
- **Latency analysis**: P90, P95, P99 percentiles at a glance
- **Request rates**: Monitor requests per second across all services

### 📝 **Centralized Logging**
- View logs from all services in one place
- Filter by service or log level
- Toggle between formatted and raw JSON views
- Export logs for further analysis

### 🎯 **Service Management**
- Monitor service status at a glance
- Drill down into individual service metrics
- Compare performance across services
- Restart services directly from the dashboard

### 🔥 **Profiling & Recording** *(New!)*
- **CPU profiling**: Capture flame graphs to identify performance bottlenecks
- **Heap profiling**: Analyze memory allocation patterns
- **Offline analysis**: Generate self-contained HTML bundles for sharing and review
- **Recording mode**: Capture metrics and profiles over time for post-mortem analysis

## 🚀 Quick Start

### Using npx (Recommended)

Launch Watt Admin with a single command:

```bash
npx wattpm admin
```

The dashboard will automatically discover your running Platformatic runtimes and open at `http://localhost:4042`.

### Installation

Install globally for convenient access:

```bash
npm install -g @platformatic/watt-admin
```

Then run:

```bash
watt-admin
```

## 💡 Usage

### Basic Usage

When you run `watt-admin`, it automatically discovers all available Platformatic runtimes:

```bash
$ watt-admin
Select a runtime: (Use arrow keys)
❯ my-app (PID: 12345) (Started at 3/10/2025, 10:00:00 AM)
  api-service (PID: 54321) (Started at 3/10/2025, 9:30:00 AM)
```

If only one runtime is running, it will be selected automatically.

### Custom Port

Run Watt Admin on a different port:

```bash
watt-admin --port 4321
```

### Recording Mode

Capture metrics and profiling data for offline analysis:

```bash
# Profile CPU usage
watt-admin --record --profile cpu

# Profile heap allocation
watt-admin --record --profile heap
```

When recording, press `Ctrl+C` to stop. Watt Admin will:
1. Collect all metrics and profiling data
2. Generate a self-contained HTML bundle
3. Automatically open the bundle in your browser

The generated HTML file contains everything you need for offline analysis—perfect for sharing with your team or reviewing later.

## 🏗️ Development

### Prerequisites

- Node.js 18 or higher
- A running Platformatic runtime to monitor

### Setup

```bash
git clone https://github.com/platformatic/watt-admin.git
cd watt-admin
npm install
cp .env.sample .env
```

### Development Mode

Auto-reload both backend and frontend on changes:

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Run Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:cli        # CLI tests
npm run test:backend    # Backend tests
npm run test:frontend   # Frontend tests
npm run test:e2e        # End-to-end tests
```

### Project Structure

```
watt-admin/
├── cli.js              # CLI entry point
├── lib/                # Core CLI functionality
├── web/
│   ├── backend/        # Fastify API server
│   ├── frontend/       # React dashboard
│   └── composer/       # Platformatic Gateway
├── watt.json           # Wattpm configuration
└── test/               # Test suites
```

## 🎯 Use Cases

### Development Workflow
Monitor your application while developing locally. Instantly see the impact of code changes on performance.

### Debugging Performance Issues
Use CPU and heap profiling to identify bottlenecks and memory leaks before they reach production.

### Team Collaboration
Generate offline HTML bundles to share performance data and profiling results with your team.

### Learning and Optimization
Understand how your services behave under load and optimize based on real data.

## 🔗 Related Tools

For production monitoring and observability, check out [Platformatic Console](https://platformatic.dev/console)—the intelligent command center for Platformatic Cloud deployments.

## 📚 Documentation

- [Platformatic Documentation](https://docs.platformatic.dev)
- [Watt Admin Blog Post](https://blog.platformatic.dev/introducing-watt-admin)
- [Platformatic Wattpm](https://docs.platformatic.dev/docs/guides/wattpm)

## 🤝 Contributing

Contributions are welcome! Please check out our [contributing guidelines](CONTRIBUTING.md) to get started.

## 📄 License

Apache-2.0 License - see [LICENSE](LICENSE) for details.

## 🙋 Support

- [GitHub Issues](https://github.com/platformatic/watt-admin/issues)
- [Discord Community](https://discord.gg/platformatic)
- [Twitter](https://twitter.com/platformatic)

---

Built with ❤️ by the [Platformatic](https://platformatic.dev) team
