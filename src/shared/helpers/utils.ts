export const syncWait = (ms) => {
  const end = Date.now() + ms;
  while (Date.now() < end) continue;
};
