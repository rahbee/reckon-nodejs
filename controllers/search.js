import axios from 'axios';
import debug from '../utils/config';
import getSearchIndex from '../utils/helper';

const BASE_URL = 'https://join.reckon.com/test2';

const getTextToSearch = () => {
  const urlTextToSearch = `${BASE_URL}/textToSearch`;
  return axios.get(urlTextToSearch);
};

const getSubTexts = () => {
  const urlSubTexts = `${BASE_URL}/subTexts`;
  return axios.get(urlSubTexts);
};

const postResults = (results) => {
  const urlPostResults = `${BASE_URL}/submitResults`;
  return axios.post(urlPostResults, results);
};

const doSearch = (textToSearch, subTexts) => {
  const strText = textToSearch.text.toLowerCase();
  const arrText = subTexts.subTexts;
  const objOutput = {};

  debug('strText', strText);
  debug('arrText', arrText);

  arrText.forEach((text) => {
    const textLowerCase = text.toLowerCase();
    const arrPosition = [];
    for (let i = 0; i < strText.length;) {
      const index = getSearchIndex(strText, textLowerCase, i);
      if ((index > -1) && (index < strText.length - 1)) {
        arrPosition.push(index + 1);
        i = (index + 1);
      } else {
        i = strText.length;
      }
    }
    objOutput[text] = arrPosition;
  });

  debug('generateOutput objOutput', objOutput);
  return objOutput;
};

const generateOutput = (objSearchResult, strText) => {
  const objOutput = {};
  objOutput.candidate = 'Rahbee Alvee';
  objOutput.text = strText;

  const arrResult = [];
  Object.keys(objSearchResult).forEach((key) => {
    const objItem = {};
    objItem.subtext = key;
    const strArray = objSearchResult[key].toString();
    const emptyResult = (strArray) || '<No Output>';
    objItem.result = emptyResult;
    arrResult.push(objItem);
  });

  objOutput.results = arrResult;
  debug('generateOutput objOutput', objOutput);
  return JSON.stringify(objOutput);
};

/**
 * GET /search
 */
exports.index = (req, res) => {
  async function httpGet() {
    let v;
    let d;
    let p;
    try { // Use promise all
      v = await getTextToSearch();
      d = await getSubTexts();
      debug('response v', v.data);
      debug('response d', d.data);

      const searchResults = doSearch(v.data, d.data);
      debug('output ', searchResults);

      const results = generateOutput(searchResults, v.data);
      p = await postResults(results);
      debug('after submission', p);
      res.json({
        textToSearch: v.data,
        subText: d.data,
        results,
        submitUrl: `${BASE_URL}/submitResults`,
        submitResponse: JSON.stringify(p.data),
      });
    } catch (err) {
      debug('httpCall', err);
      httpGet();
    }
  }
  httpGet();
};
