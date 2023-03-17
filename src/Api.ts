import Axios from 'axios';

export const fetchAircrafts = () =>
  Axios.get('https://recruiting-assessment.alphasights.com/api/aircrafts');

export const fetchFlights = () =>
  Axios.get('https://recruiting-assessment.alphasights.com/api/flights');
