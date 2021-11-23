import { assertEquals } from "https://deno.land/std@0.115.1/testing/asserts.ts";
import { envsubst } from "./envsubst.ts";

Deno.test({
  name: "envsubst() ${VARNAME} pattern without whitespace",
  fn: () => {
    Deno.env.set("VARNAME", "@VALUE@");
    const input = "SOMETEXT${VARNAME}OTHERTEXT";
    const output = envsubst(input);
    const expected = "SOMETEXT@VALUE@OTHERTEXT";
    assertEquals(output, expected);
  },
});

Deno.test({
  name: "envsubst() ${VARNAME} pattern with whitespace",
  fn: () => {
    Deno.env.set("VARNAME", "@VALUE@");
    const input = "SOMETEXT ${VARNAME} OTHERTEXT";
    const output = envsubst(input);
    const expected = "SOMETEXT @VALUE@ OTHERTEXT";
    assertEquals(output, expected);
  },
});

// NOT POSSIBLE
// Deno.test({
//   name: "envsubst() $VARNAME pattern without whitespace",
//   fn: () => {
//     Deno.env.set("VARNAME", "@VALUE@");
//     const input = "SOMETEXT$VARNAMEOTHERTEXT";
//     const output = envsubst(input);
//     const expected = "SOMETEXT@VALUE@OTHERTEXT";
//     assertEquals(output, expected);
//   },
// });

Deno.test({
  name: "envsubst() $VARNAME pattern with whitespace",
  fn: () => {
    Deno.env.set("VARNAME", "@VALUE@");
    const input = "SOMETEXT $VARNAME OTHERTEXT";
    const output = envsubst(input);
    const expected = "SOMETEXT @VALUE@ OTHERTEXT";
    assertEquals(output, expected);
  },
});

Deno.test({
  name: "envsubst() {{VARNAME}} pattern without whitespace",
  fn: () => {
    Deno.env.set("VARNAME", "@VALUE@");
    const input = "SOMETEXT{{VARNAME}}OTHERTEXT";
    const output = envsubst(input);
    const expected = "SOMETEXT@VALUE@OTHERTEXT";
    assertEquals(output, expected);
  },
});

Deno.test({
  name: "envsubst() {{VARNAME}} pattern with whitespace",
  fn: () => {
    Deno.env.set("VARNAME", "@VALUE@");
    const input = "SOMETEXT {{VARNAME}} OTHERTEXT";
    const output = envsubst(input);
    const expected = "SOMETEXT @VALUE@ OTHERTEXT";
    assertEquals(output, expected);
  },
});
