import diaries from '../../data/data';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): Array<DiaryEntry> => diaries;

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] =>
  diaries;

const findById = (id: number): DiaryEntry | undefined =>
  diaries.find(d => d.id === id);

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const diary = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  }
  
  diaries.push(diary);
  return diary;
};

export default {
  getEntries, getNonSensitiveEntries, findById, addEntry
};