let setLoadingGlobal = null;

export const registerLoadingSetter = (setter) => {
  setLoadingGlobal = setter;
};

export const getLoadingSetter = () => setLoadingGlobal;
