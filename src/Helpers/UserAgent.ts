export const getProgressbarLength = (): number => ((window.innerWidth / 10) * 9);

export const getStartingPoint = (): number => ((window.innerWidth - getProgressbarLength()) / 2 + 20);

export const getSecondsPerPixel = (episodeLength: number): number => (episodeLength / (getProgressbarLength() - 20));

export const scrollToTop = (): void => window.scrollTo(0, 0);

export const getMediumModalHeight = (height: number): number => {
  let modalHeight;
  if (window.innerHeight < window.innerWidth) {
    if (window.innerWidth >= 1850) {
      modalHeight = height - 170 - 75 - 40;
    } else if (window.innerHeight < 568) {
      modalHeight = height - 40 - 30 - 90;
    } else {
      modalHeight = height - 40 - 75 - 130;
    }
  } else if (window.innerWidth >= 1850) {
    modalHeight = height - 170 - 80 - 60;
  } else if (window.innerWidth >= 1024) {
    modalHeight = height - 130 - 80 - 60;
  } else if (window.innerWidth >= 768) {
    modalHeight = height - 110 - 70 - 55;
  } else {
    modalHeight = height - 70 - 70 - 50;
  }

  return modalHeight;
};


export const getSmalModalHeight = (height: number): number => {
  let modalHeight;
  if (window.innerHeight < window.innerWidth) {
    if (window.innerWidth >= 1850) {
      modalHeight = height - 170 - 40 - 73 - 40;
    } else if (window.innerHeight < 568) {
      modalHeight = height - 40 - 40 - 30 - 90;
    } else {
      modalHeight = height - 40 - 40 - 73 - 130;
    }
  } else if (window.innerWidth >= 1850) {
    modalHeight = height - 170 - 40 - 73 - 40;
  } else if (window.innerWidth >= 1024) {
    modalHeight = height - 130 - 80 - 60 - 73;
  } else if (window.innerWidth >= 768) {
    modalHeight = height - 110 - 70 - 55 - 70;
  } else {
    modalHeight = height - 70 - 70 - 50 - 69;
  }

  return modalHeight;
};

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
