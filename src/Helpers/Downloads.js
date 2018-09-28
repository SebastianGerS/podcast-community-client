const getListFromLocalStorage = (key) => {
  const list = localStorage.getItem(key);
  return list ? JSON.parse(list) : undefined;
};

const checkIfIsInList = (key, item) => {
  const list = getListFromLocalStorage(key);

  return list ? list.includes(item) : false;
};

const saveToListInLocalStorage = (key, item) => {
  const list = getListFromLocalStorage(key);
  let newList = [];

  if (list) {
    newList = [...list];
  }
  newList.push(item);
  localStorage.setItem(key, JSON.stringify(newList));
};
export const checkifInPosList = (id) => {
  const list = getListFromLocalStorage('positions');
  let match;
  if (list) {
    list.map((item) => {
      if (item.id === id) {
        match = item;
      }
      return item;
    });
  }
  return !!match;
};

export const getEpisodePosFromList = (id) => {
  const list = getListFromLocalStorage('positions');
  const [match] = list.filter(item => id === item.id);
  return match.pos;
};

export const saveToListOfDownloads = episodeId => saveToListInLocalStorage('downloads', episodeId);

export const savePosInLocalStorage = (item) => {
  const list = getListFromLocalStorage('positions');
  let newList = [];
  let newItem = true;
  if (list) {
    newList = list.map((listItem) => {
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

export const isDowloaded = episodeId => checkIfIsInList('downloads', episodeId);
