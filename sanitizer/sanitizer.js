exports.sanitize = (entry) =>
  entry
    // replace '\' with '\\' to avoid escape chars
    .split("\\")
    .join("\\\\")
    // escape " occurrencies
    .split('"')
    .join('"').split;
