import { walkSync } from "https://deno.land/std@0.115.1/fs/mod.ts";
import { normalize, dirname } from "https://deno.land/std@0.115.1/path/mod.ts";
import { envsubst } from "./envsubst.ts";
import { cli, ParsedArgs } from "./cli.ts";

export function envium(args: ParsedArgs) {
  for (const entry of walkSync(normalize(args.input), { includeDirs: false })) {
    const inputFile = entry.path;
    const outputFile = entry.path.replace(
      normalize(args.input),
      normalize(args.output)
    );
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
}

envium(cli.options);
