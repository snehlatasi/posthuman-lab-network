import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standaloneDir = join(root, ".next", "standalone");

if (!existsSync(standaloneDir)) {
  process.exit(0);
}

const copies = [
  [join(root, "public"), join(standaloneDir, "public")],
  [join(root, ".next", "static"), join(standaloneDir, ".next", "static")],
];

for (const [source, target] of copies) {
  if (!existsSync(source)) {
    continue;
  }

  mkdirSync(join(target, ".."), { recursive: true });
  cpSync(source, target, { force: true, recursive: true });
}
