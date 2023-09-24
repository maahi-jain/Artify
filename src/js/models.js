export const image = (id, src, alt) => {
  return {
    id: id,
    urls: {
      small: src,
    },
    alt_description: alt,
  };
};
