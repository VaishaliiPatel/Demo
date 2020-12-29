export const isNull = (input: any) => {
  if (input === null || input === undefined || input === '') {
    return true;
  }
}

export const RegEx = {
  mobile: /[^0-9]/,
}