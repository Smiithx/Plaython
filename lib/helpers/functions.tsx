export const TwoName = (string: string | null | undefined) => {
  if (!string) return;
  return string.substring(0, 2).toUpperCase();
};
