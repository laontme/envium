import { assertEquals } from "https://deno.land/std@0.115.1/testing/asserts.ts";
import { cli } from "./cli.ts";

Deno.test({
  name: "cli() short flags",
  fn: async () => {
    const inputDirectory = Deno.makeTempDirSync();
    const outputDirectory = Deno.makeTempDirSync();
    const input = ["-s", "-i", inputDirectory, "-o", outputDirectory];
    const output = await cli(input);
    const expected = {
      input: inputDirectory,
      output: outputDirectory,
      strict: true,
    };
    assertEquals(output.options, expected);
  },
});

Deno.test({
  name: "cli() long flags",
  fn: async () => {
    const inputDirectory = Deno.makeTempDirSync();
    const outputDirectory = Deno.makeTempDirSync();
    const input = [
      "--strict",
      "--input",
      inputDirectory,
      "--output",
      outputDirectory,
    ];
    const output = await cli(input);
    const expected = {
      input: inputDirectory,
      output: outputDirectory,
      strict: true,
    };
    assertEquals(output.options, expected);
  },
});
