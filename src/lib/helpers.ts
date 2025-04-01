export function formatDate(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {}
) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date));
  } catch (_err) {
    return "";
  }
}

export const removeSlashs = (str: string) => str.replace(/(^\/+)|(\/+$)/g, "");

export function throttle(cb: (...args: any[]) => any, delay = 400) {
  let wait = false;

  return (...args: any[]) => {
    if (wait) return;

    cb(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
}

export function debounce(cb: (...args: any[]) => any, delay = 400) {
  let timer: NodeJS.Timeout;
  // Return an anonymous function that takes in any number of arguments
  return function (...args: any[]) {
    // Clear the previous timer to prevent the execution of 'mainFunction'
    clearTimeout(timer);

    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export function wait(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytest")
      : (sizes[i] ?? "Bytes")
  }`;
}

export function toSentenceCase(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}
