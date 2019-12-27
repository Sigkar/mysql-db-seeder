const getRandomIds = (ids, percentChoice) => {
  return ids.filter(id => {
    if (getRandomInt(1, 100) > percentChoice) return id;
  });
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  getRandomIds,
  getRandomInt
}