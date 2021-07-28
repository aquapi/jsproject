(function (e) {
    /**
     * @param {string} pattern 
     * @param {string[][]} list 
     * @param {number} posX 
     * @param {number} posY 
     */

    const checkdown = function (pattern, list, posX, posY, match_XO) {
        var match = 0, c_posY = posY;
        while (match < match_XO) {
            if (c_posY == list[posX].length || c_posY == 0)
                break;
            if (list[posX, c_posY] == pattern) 
                match++;
            else 
                break;
            c_posY++;
        }
        return match;
    }

    /**
     * @param {string} pattern 
     * @param {string[][]} list 
     * @param {number} posX 
     * @param {number} posY 
     */

    const checkup = function (pattern, list, posX, posY, match_XO) {
        var match = 0, c_posY = posY;
        while (match < match_XO) {
            if (c_posY == list[posX].length || c_posY == 0)
                break;
            if (list[posX, c_posY] == pattern) 
                match++;
            else 
                break;
            c_posY--;
        }
        return match;
    }

    /**
     * @param {string} pattern 
     * @param {string[][]} list 
     * @param {number} posX 
     * @param {number} posY 
     */

    const checkleft = function (pattern, list, posX, posY, match_XO) {
        var match = 0, c_posX = posX;
        while (match < match_XO) {
            if (c_posX == list.length || c_posX == 0)
                break;
            if (list[c_posX, posY] == pattern) 
                match++;
            else 
                break;
            c_posX--;
        }
        return match;
    }

    /**
     * @param {string} pattern 
     * @param {string[][]} list 
     * @param {number} posX 
     * @param {number} posY 
     */

    const checkright = function (pattern, list, posX, posY, match_XO) {
        var match = 0, c_posX = posX;
        while (match < match_XO) {
            if (c_posX == list.length || c_posX == 0)
                break;
            if (list[c_posX, posY] == pattern) 
                match++;
            else 
                break;
            c_posX++;
        }
        return match;
    }

    /**
     * @param {string} pattern 
     * @param {string[][]} list 
     * @param {number} posX 
     * @param {number} posY 
     */

    const diagonal_right_down = function (pattern, list, posX, posY, match_XO) {
        var match = 0, c_posX = posX, c_posY = posY;
        while (match < match_XO) {
            if (c_posX == list.length || c_posX == 0 || c_posY == 0 || c_posY == list[c_posX].length)
                break;
            if (list[c_posX, c_posY] == pattern) 
                match++;
            else 
                break;
            c_posX++;
            c_posY++;
        }
        return match;
    }

    /**
     * @param {string} pattern 
     * @param {string[][]} list 
     * @param {number} posX 
     * @param {number} posY 
     */

    const diagonal_left_up = function (pattern, list, posX, posY, match_XO) {
        var match = 0, c_posX = posX, c_posY = posY;
        while (match < match_XO) {
            if (c_posX == list.length || c_posX == 0 || c_posY == 0 || c_posY == list[c_posX].length)
                break;
            if (list[c_posX, c_posY] == pattern) 
                match++;
            else 
                break;
            c_posX--;
            c_posY--;
        }
        return match;
    }

    /**
     * @param {string} pattern 
     * @param {string[][]} list 
     * @param {number} posX 
     * @param {number} posY 
     */

    const diagonal_right_up = function (pattern, list, posX, posY, match_XO) {
        var match = 0, c_posX = posX, c_posY = posY;
        while (match < match_XO) {
            if (c_posX == list.length || c_posX == 0 || c_posY == 0 || c_posY == list[c_posX].length)
                break;
            if (list[c_posX, c_posY] == pattern) 
                match++;
            else 
                break;
            c_posX--;
            c_posY++;
        }
        return match;
    }

    /**
     * @param {string} pattern 
     * @param {string[][]} list 
     * @param {number} posX 
     * @param {number} posY 
     */

    const diagonal_left_down = function (pattern, list, posX, posY, match_XO) {
        var match = 0, c_posX = posX, c_posY = posY;
        while (match < match_XO) {
            if (c_posX == list.length || c_posX == 0 || c_posY == 0 || c_posY == list[c_posX].length)
                break;
            if (list[c_posX, c_posY] == pattern) 
                match++;
            else 
                break;
            c_posX++;
            c_posY--;
        }
        return match;
    }

    /**
     * @param {string} pattern 
     * @param {string[][]} list 
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} match_XO
     */

    e.win = function (pattern, list, posX, posY, match_XO) {
        var match = 0;
        match += checkdown(pattern, list, posX, posY, match_XO);
        match += checkup(pattern, list, posX, posY, match_XO);
        if (match != 5) {
            match = 0;
            match += checkleft(pattern, list, posX, posY, match_XO);
            match += checkright(pattern, list, posX, posY, match_XO);
            if (match != 5) {
                match = 0;
                match += diagonal_right_down(pattern, list, posX, posY, match_XO);
                match += diagonal_left_up(pattern, list, posX, posY, match_XO);
                if (match != 5) {
                    match = 0;
                    match += diagonal_right_up(pattern, list, posX, posY, match_XO);
                    match += diagonal_left_down(pattern, list, posX, posY, match_XO);
                    if (match != 5) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
})(this);