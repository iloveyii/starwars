export class Time {
  static milliToMinHours(time) {
    return time
      ? new Date(time * 1000).toISOString().substr(11, 8)
      : padZero(randomBetween(1, 59)) + ":" + padZero(randomBetween(1, 59));
  }
}

export const randomBetween = (first, second) =>
  Math.floor(Math.random() * second) + first;

export const padZero = (number) => (number > 9 ? number : "0" + number);

Date.prototype.format = function () {
  const year = this.getFullYear();
  let month = this.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  const day = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();

  return year + "-" + month + "-" + day;
};

Date.prototype.timeFormat = function () {
  const hour = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
  const min =
    this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();

  return hour + ":" + min;
};
