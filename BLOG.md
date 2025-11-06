# Introducing Recording Mode: Capture, Profile, and Share Your Node.js Performance Data

We're excited to announce a powerful new feature in Watt Admin: **Recording Mode with CPU and Heap Profiling**. Now you can capture your application's performance data, generate flame graphs, and share everything in a single, self-contained HTML file—no internet connection required.

## The Challenge: Sharing Performance Insights

As Node.js developers, we've all been there: you've discovered a performance issue, captured some data, and now need to share it with your team. But how do you effectively communicate what you're seeing? Screenshots don't tell the whole story, and setting up monitoring dashboards for everyone isn't always practical.

Previously, Watt Admin provided real-time monitoring—perfect for live debugging. But what about post-mortem analysis? What if you need to capture a performance profile during a specific scenario, or share detailed metrics with a colleague who isn't running your application?

That's where Recording Mode comes in.

## What's New: Record, Profile, Analyze

With the new recording capabilities, Watt Admin can now:

- **📹 Record complete sessions**: Capture all metrics and performance data over time
- **🔥 Generate flame graphs**: Profile CPU usage or heap allocation to identify bottlenecks
- **📦 Create offline bundles**: Package everything into a single HTML file
- **🤝 Share effortlessly**: Send the bundle to anyone—no setup required

## How It Works

### CPU Profiling

Identify performance bottlenecks by visualizing where your application spends CPU time:

```bash
watt-admin --record --profile cpu
```

Run your application through the scenario you want to analyze, then press `Ctrl+C`. Watt Admin will:

1. Stop profiling all services in your runtime
2. Collect CPU flame graph data
3. Bundle all metrics and the flame graph into a single HTML file
4. Automatically open it in your browser

The resulting flame graph shows you exactly which functions are consuming CPU cycles, making it easy to spot optimization opportunities.

### Heap Profiling

Track down memory leaks and understand allocation patterns:

```bash
watt-admin --record --profile heap
```

Heap profiling reveals:
- Which parts of your code allocate the most memory
- Memory allocation patterns over time
- Potential memory leak sources
- Object retention paths

Perfect for debugging those mysterious memory issues that only appear under specific conditions.

## Real-World Use Cases

### Debugging Production Issues Locally

Reproduce a production issue in your local environment, record a session with CPU profiling, and share the complete analysis with your team. No need for everyone to set up the same environment—they can explore the flame graph and metrics directly from the HTML bundle.

### Performance Reviews

Before merging a significant change, record a profiling session to demonstrate its performance characteristics. Attach the HTML file to your pull request so reviewers can see the real-world impact of your optimizations.

### Team Knowledge Sharing

Found an interesting performance pattern? Record it and share the bundle in Slack or your team chat. Your colleagues can explore the interactive flame graph and metrics without any setup.

### Client Reporting

Need to show a client why their application is slow? Generate a recording with clear flame graphs that visually demonstrate the bottlenecks. The self-contained HTML makes it easy to share professional performance analysis.

## The Technical Details

Recording mode leverages Platformatic's built-in profiling capabilities:

- **Automatic service discovery**: Profiles all applications in your Platformatic runtime
- **Standards-based profiling**: Uses V8's built-in CPU and heap profilers
- **pprof format**: Stores profiling data in the industry-standard pprof format
- **Interactive visualization**: Uses react-pprof for exploring flame graphs
- **Complete capture**: Embeds metrics, logs, and profiling data in `window.LOADED_JSON`

The generated HTML bundle is truly self-contained—it includes:
- All JavaScript, CSS, and assets inlined
- Complete metrics history from the recording session
- Flame graph data for all profiled services
- Interactive UI for exploring the data

No external dependencies. No network requests. Just open and explore.

## Getting Started

### Installation

If you haven't already, install Watt Admin:

```bash
npm install -g @platformatic/watt-admin
```

Or use it directly with npx:

```bash
npx wattpm admin --record --profile cpu
```

### Basic Workflow

1. **Start a recording session**:
   ```bash
   watt-admin --record --profile cpu
   ```

2. **Run your application through the scenario** you want to analyze

3. **Stop recording** by pressing `Ctrl+C`

4. **Analyze** the automatically-opened HTML bundle

5. **Share** the bundle file with your team

### Custom Port

Recording mode works with custom ports too:

```bash
watt-admin --port 3000 --record --profile heap
```

## Under the Hood: How Recording Works

When you start Watt Admin with `--record`, here's what happens:

1. **Discovery**: Watt Admin discovers your Platformatic runtime using the RuntimeApiClient
2. **Connection**: Connects to the runtime's admin API
3. **Profiling start**: Calls `startApplicationProfiling()` on each application
4. **Metrics collection**: Continuously collects metrics at regular intervals
5. **User interaction**: You use your application while profiling runs
6. **SIGINT handling**: When you press Ctrl+C, graceful shutdown begins
7. **Profiling stop**: Calls `stopApplicationProfiling()` to get the profiling data
8. **Data bundling**: Writes profiling data (.pb files) and embeds everything in HTML
9. **Auto-launch**: Opens the generated bundle in your default browser

The resulting file lives in `web/frontend/dist/index.html` and contains everything needed for offline analysis.

## What's Next

Recording mode is just the beginning. We're exploring additional profiling capabilities:

- **Custom time ranges**: Record specific time windows
- **Comparison mode**: Compare multiple recordings side-by-side
- **Export formats**: Additional export options for different tools
- **Annotations**: Mark specific events during recording

We'd love to hear your feedback! Try recording mode and let us know what you think.

## Try It Today

Recording and profiling are available now in Watt Admin. Update to the latest version:

```bash
npm install -g @platformatic/watt-admin@latest
```

Then start profiling:

```bash
watt-admin --record --profile cpu
```

Happy profiling! 🔥

---

### Resources

- [Watt Admin on GitHub](https://github.com/platformatic/watt-admin)
- [Platformatic Documentation](https://docs.platformatic.dev)
- [Watt Admin Introduction](https://blog.platformatic.dev/introducing-watt-admin)

### Get Involved

Have questions or feedback? Connect with us:

- [GitHub Issues](https://github.com/platformatic/watt-admin/issues)
- [Discord Community](https://discord.gg/platformatic)
- [Twitter](https://twitter.com/platformatic)
