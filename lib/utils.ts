export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Split "Lead: rest of sentence." into a title and a capitalised description. */
export function splitLead(text: string): { lead: string; rest: string } {
  const i = text.indexOf(': ');
  if (i === -1) return { lead: text, rest: '' };
  const rest = text.slice(i + 2);
  return { lead: text.slice(0, i), rest: rest.charAt(0).toUpperCase() + rest.slice(1) };
}
