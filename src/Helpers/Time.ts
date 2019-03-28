const getSeconds = (s: number): string => `${s < 10 ? `0${s}` : s}`;

const getMinutes = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${m < 10 ? `0${m}` : m}:${getSeconds(s)}`;
};

const getHours = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const h = Math.floor(m / 60);
  const s = seconds - h * 60 * 60;

  return `${h < 10 ? `0${h}` : h}:${getMinutes(s)}`;
};

export const formatTime = (seconds: number): string => {
  let formatedTime;
  const s = Math.round(seconds);

  if (s < 60) {
    formatedTime = `0:${getSeconds(s)}`;
  } else if (s < 3600) {
    formatedTime = getMinutes(s);
  } else {
    formatedTime = getHours(s);
  }

  return formatedTime;
};

export const getDatefromMilisecond = (ms: number): string => {
  const date = new Date(ms).toLocaleDateString();
  return `${date.substring(0, 5)} ${date.substring(6, date.length)}`;
};

export const getSecondsFromTimeString = (string: string): number => {
  const [h, m, s] = string.split(':');

  return +((+h * 60 * 60) + (+m * 60) + (+s));
};
