import express from 'express';
import diaryService from '../services/diaryService';
import { toNewDiaryEntry } from '../utils';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
})

router.get('/:id',  (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  diary
    ? res.send(diary)
    : res.sendStatus(404);
})

router.post('/', (req, res) => {
  try {
    const diary = toNewDiaryEntry(req.body);
    const savedDiary = diaryService.addEntry(diary);
    res.json(savedDiary);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

export default router;