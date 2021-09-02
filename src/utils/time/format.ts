import dayjs from 'dayjs';

function formatTimeSince(date: string): string {
  return dayjs(date).fromNow();
}

export { formatTimeSince };
