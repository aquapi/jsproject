(
    /**
     * @param {globalThis} e 
     * @since 1.1
     */

    function (e) {
        "use strict";
        const keyword = ["assert", "break", "case", "catch", "goto", "native", "class", "continue", "const",
            "default", "do", "else", "enum", "throws", "exports", "extends", "final", "finally", "for", "if",
            "implements", "int", "import", "instanceof", "interface", "module", "new", "with", "synchronized",
            "private", "protected", "return", "static", "never", "undefined", "volatile", "super", "switch",
            "this", "throw", "any", "export", "bigint", "package", "try", "var", "void", "while", "true",
            "false", "null", "arguments", "long", "await", "debugger", "delete", "eval", "function", "let",
            "typeof", "double", "constructor", "in", "of", "require", "boolean", "yield", "transient", "from",
            "as", "async", "get", "set", "then", "number", "string", "type", "char", "readonly", "declare",
            "symbol", "namespace", "byte", "float", "public"];
        const strx = /^"|^'/;
        const nx = /"$|'$/;
        const numx = /^-?[0-9]\d*(\.\d+)?$/;
        var in_string = false;

        /**
         * @param {string} str 
         * @param {boolean} in_string
         * @returns highlighted string
         */

        const replace = function (str, in_string) {
            if (strx.test(str) || in_string || nx.test(str)) {
                in_string = true;
                return "<span class='str'>" + str + "</span>";
            } else if (numx.test(str) || str == "\"" || str == "'") {
                in_string = false;
                return "<span class='num'>" + str + "</span>";
            } else {
                for (const i of keyword) {
                    if (i == str) {
                        return "<span class='keyword'>" + str + "</span>";
                    }
                }
                return str;
            }
        }
        const quote = [",", ".", ";", "[", "]", "{", "}", "(", ")", "[]", "{}", "()", ":", "<", ">", "\t"];

        /**
         * @param {string} str 
         * @returns str character array
         */

        const toCharArray = function (str) {
            var arr = [];
            for (let i = 0; i < str.length; i++) {
                arr.push(str.charAt(i));
            }
            return arr;
        }

        /**
         * @param {string} str 
         * @returns highlighted text
         */

        const replace_quote = function (str, in_string) {
            var check = true;
            for (const q of quote) {
                if (str.indexOf(q) > -1) check = false;
            }
            if (replace(str, in_string) == str && !in_string && check) {
                in_string = false;
                return str;
            }
            if (str.indexOf("\"") == str.length - 1 && in_string) {
                in_string = false;
                return '<span class="str">' + str + '</span>';
            }
            if (str.indexOf('\'') == str.length - 1 && in_string) {
                in_string = false;
                return '<span class="str">' + str + '</span>';
            }
            for (const q of quote) {
                var index = toCharArray(str).indexOf(q);
                if (index < 0) {
                    continue;
                } else if (index == 0) {
                    return q + replace_quote(str.substring(index + 1), false);
                } else if (index == str.length - 1) {
                    return replace_quote(str.substring(0, index), in_string) + q;
                } else {
                    return replace_quote(str.substring(0, index), in_string) + q + replace_quote(str.substring(index + 1, str.length), false);
                }
            }
            if (str.indexOf("\"") == 0 && !in_string) {
                in_string = true;
                return '<span class="str">' + str + '</span>';
            }
            if (str.indexOf('\'') == 0 && !in_string) {
                in_string = true;
                return '<span class="str">' + str + '</span>';
            }
            return replace(str, in_string);
        }

        /**
         * @param {string} selector 
         * @description cannot contains 2 or more IDEs in one site
         * @since 1.1
         */

        e.Handler = function (selector = "div[code] > code") {
            this.JShighlight = function () {
                var val = document.querySelector(selector).innerHTML;
                var res = val.split(" ");
                var result = "";
                for (const e of res) {
                    if (e == "<br>") {
                        result += e + " ";
                        continue;
                    }
                    result += replace_quote(e, in_string) + " ";
                }
                document.querySelector(selector).innerHTML = result;
                in_string = false;
            }

            this.tabignore = function () {
                document.querySelector(selector).addEventListener('keydown', function (e) {
                    if (e.key == 'Tab') {
                        e.preventDefault();
                        var start = this.selectionStart;
                        var end = this.selectionEnd;
                        this.value = this.value.substring(0, start) +
                            '\t' + this.value.substring(end);
                        this.selectionStart =
                            this.selectionEnd = start + 1;
                    }
                });
            }

            this.IDESetup = function () {
                document.querySelector("div[ide-container] > textarea").addEventListener("keyup", function (e) {
                    document.querySelector(selector).innerHTML = document.querySelector("textarea").value.replace(/\n\r?/g, '<br/>');
                    new Handler(selector).JShighlight();
                });
                document.querySelector("div[ide-container] > textarea").addEventListener("keydown", function (e) {
                    if (e.key == 'Tab') {
                        e.preventDefault();
                        var start = this.selectionStart;
                        var end = this.selectionEnd;
                        this.value = this.value.substring(0, start) +
                            '    ' + this.value.substring(end);
                        this.selectionStart =
                            this.selectionEnd = start + 4;
                    }
                    if (e.key == "Backspace") {
                        if (this.value.endsWith("    ")) {
                            this.value = this.value.substring(0, this.value.length - 4);
                        }
                    }
                })
                document.querySelector("div[ide-container] > textarea").addEventListener("scroll", function (e) {
                    var k = document.querySelector("div[ide-container] > textarea").scrollTop;
                    document.querySelector(selector).parentNode.scrollTo(0, k);
                })
            }
        }

        /**
         * @param {string} key 
         * @returns true if keyword contains key
         * @summary for updating keyword
         * @since 1.1
         */

        e.check = function (key) {
            return keyword.includes(key);
        }
    }
)(this);