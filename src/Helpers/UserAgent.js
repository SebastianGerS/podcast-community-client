export const getProgressbarLength = () => ((window.innerWidth / 10) * 9);

export const getStartingPoint = () => ((window.innerWidth - getProgressbarLength()) / 2 + 10);

export const getSecondsPerPixel = episodeLength => (episodeLength / (getProgressbarLength() - 20));

export const scrollToTop = () => window.scrollTo(0, 0);
