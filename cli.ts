import {
  Command,
  ValidationError,
  ITypeInfo,
} from "https://deno.land/x/cliffy@v0.20.1/command/mod.ts";
import { isDirectory } from "./is_dir.ts";

export async function cli(args: string[]) {
  return await new Command()
    .name("envium")
    .version("0.1.6")
    .type("dir", directoryType)
    .option("-i, --input <directory:dir>", "Input directory", {
      required: true,
    })
    .option("-o, --output <directory:dir>", "Output directory", {
      required: true,
    })
    .option("-s, --strict [strict:boolean]", "Throw if env is not exists", {
      default: false,
    })
    .parse(args);
}

export function directoryType({ label, name, value }: ITypeInfo) {
  if (isDirectory(value)) {
    return value;
  }
  throw new ValidationError(
    `${label} "${name}" must be a valid "directory", but got "${value}".`
  );
}

export interface ParsedArgs {
  input: string;
  output: string;
  strict: boolean;
}
