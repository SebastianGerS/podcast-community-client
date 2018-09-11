const getSeconds = s => `${s < 10 ? `0${s}` : s}`;

const getMinutes = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${m < 10 ? `0${m}` : m}:${getSeconds(s)}`;
};

const getHours = (seconds) => {
  const m = Math.floor(seconds / 60);
  const h = Math.floor(m / 60);
  const s = seconds - h * 60 * 60;

  return `${h < 10 ? `0${h}` : h}:${getMinutes(s)}`;
};

export const formatTime = (seconds) => {
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

export const getDatefromMilisecond = (ms) => {
  const date = new Date(ms).toLocaleDateString();
  return `${date.substring(0, 5)} ${date.substring(6, date.length)}`;
};
