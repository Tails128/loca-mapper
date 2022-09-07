export const sanitize = (entry: string) =>
  entry
    // replace '\' with '\\' to avoid escape chars
    .split("\\")
    .join("\\\\")
    // escape " occurrencies
    .split('"')
    .join('"').split;
