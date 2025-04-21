let count = 0;
function increase() {
  count++;
}
function getcount() {
  return count;
}
// 외부에서 사용가능
module.exports.increase = increase;
module.exports.getcount = getcount;
