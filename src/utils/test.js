function getUniqueByField(data, field) {
  const seen = new Set();
  return data.filter(item => {
    if (seen.has(item[field])) {
      return false;
    }
    seen.add(item[field]);
    return true;
  });
}