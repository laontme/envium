// From https://github.com/tuplo/envsubst/blob/d126ca5/src/index.ts which is
// licensed under MIT (https://github.com/tuplo/envsubst/blob/d126ca5/LICENSE)
const varNames = "[a-zA-Z_]+[a-zA-Z0-9_]*";
const placeholders = ["\\$_", "\\${_}", "{{_}}"];
const envVars = placeholders
  .map((placeholder) => placeholder.replace("_", `(${varNames})`))
  .join("|");
const rgEnvVars = new RegExp(envVars, "gm");
// end tuplo's code

export function envsubst(input: string): string {
  let matches = Array.from(input.matchAll(rgEnvVars));
  matches = matches.map((match) => match.filter((item) => !!item));

  let output = input;

  matches.forEach((match) => {
    const value = Deno.env.get(match[1]) || match[0];

    output = output.replaceAll(match[0], value);
  });

  return output;
}
