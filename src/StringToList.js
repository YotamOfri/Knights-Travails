export function StringToList(string) {
  let arr = [];
  while (string.length > 1) {
    let cleanedStr = string.substring(10, 5).replace(/\[|\]/g, "");
    var pairs = cleanedStr.split("][");
    if (pairs[0].length === 0) break;
    string = string.substring(5);
    arr = [
      ...arr,
      ...pairs.map(function (pair) {
        return pair.split(",").map(Number);
      }),
    ];
  }
  return arr;
}
