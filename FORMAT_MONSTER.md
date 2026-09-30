# Format Monster

Format Monster is a branded fork of [BentoPDF](https://github.com/alam00000/bentopdf), licensed under AGPL-3.0-only. The full PDF toolkit and upstream attribution are retained.

## Run behind Caddy

The release workflow publishes `ghcr.io/wellfreezz/format-monster:latest` for Linux amd64 and arm64 after tests and the production build succeed. Commit-specific tags use `sha-<full commit SHA>`.

```sh
docker compose -f compose.format-monster.yml pull
docker compose -f compose.format-monster.yml up -d
```

The supplied Compose file listens on `127.0.0.1:3000`, forwarding to container port 8080. Caddy on the host can use:

```caddyfile
format.monster {
    reverse_proxy 127.0.0.1:3000
}
```

Stop the previous container using host port 3000 before starting this one. If Caddy runs in Docker, use a shared Docker network and the service name instead of host loopback.

On a newly created fork, enable GitHub Actions if disabled. After the first image publication, set the GHCR package visibility to public for anonymous pulls, or authenticate Docker to GHCR.

## Development

```sh
npm ci
npm run dev
npm run test:run
npm run build:with-docs
```

Brand defaults live in `scripts/format-monster-env.mjs`. UI colours live in `src/css/brand-tokens.css`; components consume semantic variables and the mapped Tailwind colours. The approved SVG and transparent PNG are in `public/images/format-monster.*`. Docker build arguments override the brand and canonical URL when needed.

The production post-processing brands page metadata without changing upstream author credits, legal notices, or quoted testimonials. HTML compression is handled by Nginx after post-processing; other assets retain build-time compression.

## Source and licence

Source: https://github.com/WellFREEzZ/format-monster

Upstream: https://github.com/alam00000/bentopdf

See `LICENSE` for AGPL-3.0-only terms and upstream files for third-party notices.
