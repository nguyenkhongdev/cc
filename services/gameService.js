// gameService.js
function generateDiceResult() {
    const x1 = Math.floor(Math.random()*6)+1;
    const x2 = Math.floor(Math.random()*6)+1;
    const x3 = Math.floor(Math.random()*6)+1;
    const tong = x1+x2+x3;
    const ket_qua = (tong>=4 && tong<=10) ? 'xỉu' : (tong>=11 && tong<=17) ? 'tài' : 'đặc biệt';
    return { xuc_xac1: x1, xuc_xac2: x2, xuc_xac3: x3, tong, ket_qua };
}
function generatePattern(history) {
    const recent = history.slice(-15).map(s => s.ket_qua === 'tài' ? 't' : 'x');
    return recent.join('');
}
function predict(history) {
    const pattern = generatePattern(history);
    const t = (pattern.match(/t/g)||[]).length;
    const x = (pattern.match(/x/g)||[]).length;
    const du_doan = t > x ? 'tài' : 'xỉu';
    const do_tin_cay = Math.round(Math.max(t,x)/15*100)+'%';
    return { du_doan, do_tin_cay };
}
module.exports = { generateDiceResult, generatePattern, predict };
