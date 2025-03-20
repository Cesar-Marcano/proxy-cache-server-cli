# Proxy Cache Server CLI

A lightweight and configurable proxy server that uses Redis to cache responses from an origin server. This project helps improve application performance by reducing repeated requests to remote servers through caching.

## Origin

This project is inspired by the [roadmap.sh](https://roadmap.sh) projects for backend development.

#### Example Command

```bash
caching-proxy --port <number> --origin <url>
```

- `--port` is the port on which the caching proxy server will run.
- `--origin` is the URL of the server to which the requests will be forwarded.

For example, if the user runs the following command:

```bash
caching-proxy --port 3000 --origin http://dummyjson.com
```

The caching proxy server should start on port 3000 and forward requests to `http://dummyjson.com`.

Example of use of the proxy cache server:

To retrieve a cached version of `http://dummyjson.com/posts/1` using the proxy cache server, you can use the following commands:

(Windows)

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/posts/1" -Method Get
```

(Unix-Like)

```bash
curl -X GET "http://localhost:3000/posts/1"
```

#### Response Headers

- If the response is from the cache:
    ```text
    X-Cache: HIT
    ```
- If the response is from the origin server:
    ```text
    X-Cache: MISS
    ```

#### Clearing the Cache

You should also provide a way to clear the cache by running a command like the following:

```bash
caching-proxy --clear-cache
```

After building this project, you should have a good understanding of how caching works and how to build a caching proxy server to cache responses from other servers.

## Features

- **Redis-based caching**: Stores and manages responses from the origin server in Redis.
- **Configurable TTL**: Controls the time-to-live (TTL) of cached responses with a customizable value.
- **Cache clearing**: CLI option to clear the cache.
- **Flexible CLI**: Easy configuration via command-line options.

## Installation

### Prerequisites

- Node.js (LTS versions recommended)
- Redis (if not running on `localhost:6379` you can change the url using the `--redisUrl` or `-r` param)
- PNPM (Not required but recommended, you can use npm, yarn or whatever you want. But if you're experimenting problems with the package manager, use pnpm for this project or see the [Docker](#docker) section.)

### Clone the repository

```bash
git clone https://github.com/Cesar-Marcano/proxy-cache-server-cli.git
cd proxy-cache-server-cli
```

### Install dependencies

```bash
pnpm install
```

### Docker

You can use Docker to run the proxy cache server without installing Node.js or Redis on your local machine.

#### Build the Docker Image

Build the Docker image using the provided `Dockerfile`:

```bash
docker build -t proxy-cache-server-cli .
```

#### Run the Redis server using docker-compose (optional)

```bash
docker-compose up -d redis
```

#### Run the Docker Container

To run the Docker container, use the following command:

```bash
docker run \
  --name proxy-cache-server \
  --network proxy-network \
  -p <PORT>:<PORT> \
  -e REDIS_URL=redis://redis:6379 \
  proxy-cache-server-cli --port <PORT> --origin <YOUR_FORWARD_URL_HERE>
```

Replace `<PORT>` with whatever you want and `<YOUR_FORWARD_URL_HERE>` with the domain you want to cache (ex. https://jsondummy.com).

### Docker Compose

If you dont want to build and run the instance of redis separately you should do this:

- Edit `./docker-compose.yml` and add the following line to the `proxy-cache-service`:
    ```yml
    command: ["pnpm", "start", "--", "--port", "<PORT>", "--origin", "<FORWARD_URL>"]
    ports:
      - "<PORT>:<PORT>"
    ```

- Run `docker-compose up -d`

## Usage

You can run the proxy server or clear the cache using the CLI as follows:

### Start the Proxy Server

The server will listen on a configurable port and forward requests to an origin server. The cache will be used for the responses from that server.

```bash
pnpm start -- -p 3000 -o http://example.com --ttl 7200
```

- `-r, --redisUrl <url>`: RedisDB url to save cached data.
- `-p, --port <port>`: Port where the proxy server will run. Default: `3000`.
- `-o, --origin <origin url>`: The origin server URL to forward requests to.
- `-t, --ttl <time in seconds>`: Cache time-to-live (TTL). Default: `3600` seconds (1 hour).

### Clear the Cache

If you want to clear the cached data stored in Redis:

```bash
pnpm start -- --clear-cache # Note: If your redis server is not running in redis://localhost:6379 you must add -r <your redis server url>
```

This will delete all cached data.

## Directory Structure

```bash
.
├── jest.config.js            # Jest configuration for unit testing
├── .prettierrc               # Prettier configuration for code formatting
├── Dockerfile                # Dockerfile for building the Docker image
├── docker-compose.yml        # Docker Compose configuration
├── src/
│   ├── cli.ts                # CLI configuration
│   ├── config.ts             # General configurations
│   ├── index.ts              # Main entry point
│   ├── server.ts             # Proxy server setup
│   ├── types.ts              # Types used in the project
│   ├── services/             # Cache and proxy services
│   │   ├── cacheService.ts   # Logic for managing cache with Redis
│   │   └── proxyService.ts   # Logic for handling proxy requests
│   └── utils/                # Utility functions
│       ├── buildQueryString.ts  # Utility to transform express `req.query` to strings
│       ├── extractHeaders.ts    # Extract headers from requests to send to the origin server
│       ├── fetcher.ts           # Client for making HTTP requests
│       ├── getOptions.ts        # Function to parse CLI options
│       ├── normalizeUrl.ts      # Normalize URLs
│       └── redis.ts             # Redis connection setup (singleton)
└── tests/                    # Unit tests directory
```

## Tests

To run the unit tests for the project, you can use Jest. First, ensure you have installed both dev and production dependencies, then run:

```bash
npm test
```

This will execute all the tests defined in the `tests/` directory.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

- **Name**: Cesar Marcano
- **GitHub**: [Cesar-Marcano](https://github.com/Cesar-Marcano)
