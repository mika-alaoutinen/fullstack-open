import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry } from '../types';

const addEntry = async (id: string, entry: Entry): Promise<Entry|void> =>
  axios.post(`${apiBaseUrl}/patients/${id}/entries`, entry)
    .then(response => response.data)
    .catch(error => console.log(error));

export default { addEntry };