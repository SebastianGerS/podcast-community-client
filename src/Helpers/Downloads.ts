interface EpisodePosition {
  id: string;
  pos: number;
}

const isEpisodePositionList = (list: (EpisodePosition | string)[]): list is EpisodePosition[] => (
  (list as EpisodePosition[])[0].id !== undefined
);

const getListFromLocalStorage = (key: string): (EpisodePosition | string)[] => {
  const list = localStorage.getItem(key);
  return list ? JSON.parse(list) : undefined;
};

const checkIfIsInList = (key: string, item: string): boolean => {
  const list = getListFromLocalStorage(key);

  return list ? list.includes(item) : false;
};

const saveToListInLocalStorage = (key: string, item: EpisodePosition | string): void => {
  const list = getListFromLocalStorage(key);
  let newList: (EpisodePosition | string)[] = [];

  if (list) {
    newList = [...list];
  }
  newList.push(item);
  localStorage.setItem(key, JSON.stringify(newList));
};

export const checkifInPosList = (id: string): boolean => {
  const list = getListFromLocalStorage('positions');
  let match;
  if (list) {
    list.map((item: EpisodePosition) => {
      if (item.id === id) {
        match = item;
      }
      return item;
    });
  }
  return !!match;
};

export const getEpisodePosFromList = (id: string): number => {
  const list = getListFromLocalStorage('positions');
  if (isEpisodePositionList(list)) {
    const [match] = list.filter((item: EpisodePosition) => id === item.id);
    return match.pos;
  }
  return 0;
};

export const saveToListOfDownloads = (episodeId: string): void => saveToListInLocalStorage('downloads', episodeId);

export const savePosInLocalStorage = (item: EpisodePosition): void => {
  const list = getListFromLocalStorage('positions');
  let newList: EpisodePosition[] = [];
  let newItem = true;
  if (list) {
    newList = list.map((listItem: EpisodePosition) => {
      if (listItem.id === item.id) {
        newItem = false;
        return item;
      }
      return listItem;
    });
  }
  if (newItem) {
    newList.push(item);
  }

  localStorage.setItem('positions', JSON.stringify(newList));
};

export const isDowloaded = (episodeId: string): boolean => checkIfIsInList('downloads', episodeId);
