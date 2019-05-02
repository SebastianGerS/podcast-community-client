function removeHtmlFromString(string: string): string {
  return string.replace(/<(?:.|\n)*?>/gm, '');
}

function getMarkupOffset(text: string, maxLength: number): number {
  const matchedMarkup = text.match(/<(?:.|\n)*?>/gm);
  let markupOffset = 0;
  if (matchedMarkup) {
    let lastMatchIndex = 0;
    for (let i = 0; i < matchedMarkup.length; i += 1) {
      const indexOfMatch = text.indexOf(matchedMarkup[i], lastMatchIndex);

      if (indexOfMatch > maxLength + markupOffset) {
        break;
      }

      lastMatchIndex = indexOfMatch;
      markupOffset += matchedMarkup[i].length;
    }
  }
  return markupOffset;
}

export function setMaxLength(text: string, maxLength: number): string {
  const cleanText = removeHtmlFromString(text);
  if (cleanText.length < maxLength) {
    return text;
  }
  const markupOffset = getMarkupOffset(text, maxLength);

  return `${text.substring(0, maxLength + markupOffset - 4)}...`;
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
