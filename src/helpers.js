// Date ----------------------------------
export const LANGUAGE = {
  ENGLISH: "en",
  KOREAN: "ko",
};

export const formatDate = (date) =>
  new Intl.DateTimeFormat("ko").format(new Date(date));

const dayStringArr = (language) => {
  return (
    (language === LANGUAGE.ENGLISH && [
      "SUN",
      "MON",
      "TUE",
      "WED",
      "THU",
      "FRI",
      "SAT",
    ]) ||
    (language === LANGUAGE.KOREAN && ["일", "월", "화", "수", "목", "금", "토"])
  );
};

export const formatDay = (date, language) => {
  const dateInt = date.getDay();
  return dayStringArr(language).find((_, i) => i === dateInt);
};

export const generateRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
