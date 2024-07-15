export function randomString() {
    let res = '';
    const str = "1234567890zxcvbnmlkjhgfdsaqwertyuiop";
    for(let i = 0; i < 6; i++) {
        res += str[Math.floor(Math.random() * str.length)];
    }
    return res;
}