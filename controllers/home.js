import axios from 'axios';
import debug from '../utils/config';

const BASE_URL = 'https://join.reckon.com/test1';

const getBound = () => {
  const urlBound = `${BASE_URL}/rangeInfo`;
  return axios({ method: 'get', url: urlBound, responseType: 'json' });
};

const getDivisors = () => {
  const urlBound = `${BASE_URL}/divisorInfo`;
  return axios({ method: 'get', url: urlBound, responseType: 'json' });
};

const isDivisible = (dividend, divisorBy) => (dividend % divisorBy === 0);

const generateOutput = (bounds, divisorDetails) => {
  const lowerBound = bounds.lower;
  const upperBound = bounds.upper;
  const divisors = divisorDetails.outputDetails;
  const objOutput = {};

  for (let i = lowerBound; i <= upperBound; i += 1) {
    // debug(i, ': ');
    divisors.forEach((element) => {
      const blnDivisible = isDivisible(i, element.divisor);
      if (blnDivisible) {
        if (!objOutput[i]) objOutput[i] = element.output;
        else objOutput[i] += element.output;
      } else if (!objOutput[i]) {
        objOutput[i] = '';
      }
    });
  }

  debug('generateOutput objOutput', objOutput);
  return objOutput;
};

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  async function httpGet() {
    let v;
    let d;
    try { // Use promise all
      v = await getBound();
      d = await getDivisors();
      debug('response v', v.data);
      debug('response d', d.data);

      const output = generateOutput(v.data, d.data);
      debug('output ', output);
      res.status(200).render('home', {
        title: 'Test 1',
        arrData: output,
      });
    } catch (err) {
      debug('httpCall', err);
      debug('Retrying... ');
      httpGet();
    }
  }
  // Make an Http Call
  httpGet();
};

