import { spawnSync } from "node:child_process";

// Official sync preserves the last valid snapshot. A provider outage should
// leave that baseline available without blocking article publication.
const result = spawnSync(
	process.execPath,
	["scripts/anime/sync.mjs", "--if-stale"],
	{ stdio: "inherit" },
);
if (result.status !== 0) {
	console.warn(
		"Anime refresh unavailable; using the existing snapshot or configured fallback.",
	);
}
