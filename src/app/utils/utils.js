class Utils {
    /**
     * anonid method which follows RFC4122v4.
     */
    static anonid() {
        // Private array of chars to use
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = new Array(20), rnd = 0, r;
        for (let i = 0; i < uuid.length; i++) {
            if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[(i == 11) ? (r & 0x3) | 0x8 : r];
        }
        return uuid.join('').toLowerCase();
    }
}

export default Utils;
