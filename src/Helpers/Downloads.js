export const getListOfDownloads = () => {
  const downloads = localStorage.getItem('downloads');
  return downloads ? JSON.parse(downloads) : undefined;
};

export const saveToListOfDownloads = (episodeId) => {
  const downloads = getListOfDownloads();
  let newListOfDownloads = [];

  if (downloads) {
    newListOfDownloads = [...downloads];
  }
  newListOfDownloads.push(episodeId);
  localStorage.setItem('downloads', JSON.stringify(newListOfDownloads));
};

export const isDowloaded = (episodeId) => {
  const downloads = getListOfDownloads();
  return downloads ? downloads.includes(episodeId) : false;
};
