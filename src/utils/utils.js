const objLen = (obj) => {
  if (obj)
    return (Object.keys(obj).length);
  else
    return (undefined);
};

export {
  objLen,
};