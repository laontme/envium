import { walkSync } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { normalize, dirname } from "https://deno.land/std@0.115.1/path/mod.ts";
import { isDirectory } from "./is_dir.ts";
import { envsubst } from "./envsubst.ts";

const paths = {
  in: normalize(Deno.args[0]),
  out: normalize(Deno.args[1]),
};

// console.log(paths);

// console.log(isDirectory(paths.in));
// console.log(isDirectory(paths.out));

if (!isDirectory(paths.in) || !isDirectory(paths.out)) {
  throw new Error("Args must be a valid directory");
}

for (const entry of walkSync(paths.in, { includeDirs: false })) {
  const inputFile = entry.path;
  const outputFile = entry.path.replace(paths.in, paths.out);
  const input = Deno.readTextFileSync(inputFile);
  const output = envsubst(input);
  try {
    Deno.writeTextFileSync(outputFile, output);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      Deno.mkdirSync(dirname(outputFile), { recursive: true });
      Deno.writeTextFileSync(outputFile, output);
    } else {
      throw error;
    }
  }
}
