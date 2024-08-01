export const saveCookie = (name: string, value: string): string | null => {
  const cookie = `; ${document.cookie}`;
  const parts = cookie.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};
