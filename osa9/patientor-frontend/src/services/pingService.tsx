import axios from 'axios';
import { apiBaseUrl } from '../constants';

const ping = async () =>
  axios.get<void>(`${apiBaseUrl}/ping`);

export default { ping };