import CountryCodes from "./ICAO-constants/CountryCodes.json";
import DocumentTypes from "./ICAO-constants/DocumentTypes.json";
import SexCodes from "./ICAO-constants/SexCodes.json";

function transcribeDocType(type) {
  let result = DocumentTypes[type.toString()];
  if (result == null) {
    //Reason: i.e. P indicates the document is a passport. One additional character may be used to further identify the document at the discretion of the issuing State [https://developers.mobbeel.com/docs/mobbscan-icao-document-types/]. That means that if i have a 'PA', I would still want to indicate that it is a passport. DocumentTypes would return null.
    const firstChar = type.charAt(0);
    const secondChar = type.charAt(1);
    result = DocumentTypes[firstChar];
    result = result.concat(", " + secondChar);
  }
  return result;
}
function transcribeCountryCode(countryCode) {
  const result = CountryCodes[countryCode.toString()];
  return result;
}
function transcribeSexCode(sexCode) {
  const result = SexCodes[sexCode.toString()];
  return result;
}
function convertYYMMDD_toBG(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year} г.`;
}

function convertTimestampToLocaleDatetime(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const localizedDatetime = date.toLocaleString("bg-BG", options);

  return localizedDatetime;
}
function indicateIfStrEmpty(str) {
  const result = str == null || str == "" ? "╳" : str;
  return result;
}

export {
  transcribeDocType,
  transcribeCountryCode,
  transcribeSexCode,
  convertYYMMDD_toBG,
  convertTimestampToLocaleDatetime,
  indicateIfStrEmpty,
};