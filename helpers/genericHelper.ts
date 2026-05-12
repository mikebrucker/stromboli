export function classNames(names: Record<string, boolean | null | undefined>): string {
  const classes = [];
  for (const key in names) {
    if (Boolean(names[key]))
      classes.push(key);
  }
  return classes.join(" ");
}
