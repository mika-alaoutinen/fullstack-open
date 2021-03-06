/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewDiaryEntry, Visibility, Weather } from './types';

export const toNewDiaryEntry = (object: any): NewDiaryEntry =>
  ({
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  });

// Parse all diary fields:
const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment: ' + comment);
  }
  return comment;
}

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
}

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
      throw new Error('Incorrect or missing visibility: ' + visibility);
  } 
  return visibility;
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  } 
  return weather;
}

// Type guards:
const isDate = (date: string): boolean =>
  Boolean(Date.parse(date));

const isString = (text: any): text is string =>
  typeof text === 'string' || text instanceof String;

const isVisibility = (param: any): param is Visibility =>
  Object.values(Visibility).includes(param);
  
const isWeather = (param: any): param is Weather =>
  Object.values(Weather).includes(param);