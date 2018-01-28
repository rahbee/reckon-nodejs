const getSearchIndex = (textToSearch, subText, arrPosition) => {
  let i = arrPosition || 0;
  for (; i < textToSearch.length; i += 1) {
    for (let j = 0; j < subText.length; j += 1) {
      if (textToSearch[i + j] !== subText[j]) {
        break;
      }
      if (j === subText.length - 1) {
        return i;
      }
    }
  }
  return -1;
};

export default getSearchIndex;
