import { assertEquals } from "https://deno.land/std@0.115.1/testing/asserts.ts";
import { isDirectory } from "./is_dir.ts";

Deno.test({
  name: "isDirectory() on non-exists directory",
  fn: () => {
    const input = Deno.makeTempDirSync();
    Deno.removeSync(input, { recursive: true });
    const output = isDirectory(input);
    const expected = false;
    assertEquals(output, expected);
  },
});

Deno.test({
  name: "isDirectory() on directory",
  fn: () => {
    const input = Deno.makeTempDirSync();
    const output = isDirectory(input);
    const expected = true;
    assertEquals(output, expected);
  },
});

Deno.test({
  name: "isDirectory() on file",
  fn: () => {
    const input = Deno.makeTempFileSync();
    const output = isDirectory(input);
    const expected = false;
    assertEquals(output, expected);
  },
});
