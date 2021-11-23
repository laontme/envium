export function isDirectory(path: string): boolean {
  try {
    if (Deno.lstatSync(path).isDirectory) {
      return true;
    }
  } catch (_error) {
    return false;
  }

  return false;
}
