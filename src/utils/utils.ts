import tailwindConfig from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';

export default resolveConfig(tailwindConfig as any);

// UTILS
export const isEmpty = (list: any[]): boolean => {
  return list.length === 0;
};

export const isLastElement = (list: any[], element: any): boolean => {
  return list.length > 0 && list[list.length - 1] === element;
};

export const addElementAt = (
  insertAt: number,
  element: any,
  list: any[]
): any[] => {
  if (insertAt <= list.length) {
    return [...list.splice(insertAt, 0, element)];
  }
  return list;
};

export const isNumberInRangeOf = (
  num: number,
  rangeStart: number,
  rangeEnd: number
): boolean => {
  return num >= rangeStart && num <= rangeEnd;
};
