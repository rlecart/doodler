const objLen = (obj) => {
  if (obj)
    return (Object.keys(obj).length);
  else
    return (undefined);
};

const generateId = () => {
  return (Math.random().toString(36).substring(2));
};

const createVariance = (variance) => {
  return (Math.floor(Math.random() * variance));
};

export {
  objLen,
  generateId,
  createVariance,
};