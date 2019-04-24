export function setMaxLength(word: string, maxLength: number): string {
  if (word.length < maxLength) {
    return word;
  }

  return `${word.substring(0, maxLength - 4)}...`;
}

export const getRatingIcon = (rating: number): string => {
  let ratingIcon;

  if (rating === 0) {
    ratingIcon = 'no-rating';
  } else if (rating < 1.3) {
    ratingIcon = 'low-rating';
  } else if (rating < 3.8) {
    ratingIcon = 'moderate-rating';
  } else {
    ratingIcon = 'heigh-rating';
  }
  return ratingIcon;
};

export function MogoDbTimeStringToDate(timeString: string): string {
  return timeString.substring(0, timeString.indexOf('T'));
}

export function MogoDbTimeStringToTime(timeString: string): string {
  return timeString.substr(timeString.indexOf('T') + 1, 5);
}

export function isImage(file: File): boolean {
  const filetypes = /jpeg|jpg|svg|png|gif/;
  const mimetype = filetypes.test(file.type);
  const name = filetypes.test(file.name);

  return mimetype && name;
}
