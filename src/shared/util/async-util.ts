export async function wait(forMs: number, abort?: Promise<void>) {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(() => resolve(), forMs);

    abort?.then(() => {
      clearTimeout(timeoutId);
      reject();
    });
  });
}
