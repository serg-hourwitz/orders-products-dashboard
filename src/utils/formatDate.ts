const normalizeDate = (date: string) => date.replace(' ', 'T');

export const formatShortDate = (date: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(normalizeDate(date)));

export const formatLongDate = (date: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(normalizeDate(date)));
