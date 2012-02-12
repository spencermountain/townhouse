
/**
 *  quote a unicode string to turn it into a valid mql /type/key/value
 *
 */
var mqlkey_start = 'A-Za-z0-9';
var mqlkey_char = 'A-Za-z0-9_-';
var MQLKEY_VALID = new RegExp('^[' + mqlkey_start + '][' + mqlkey_char + ']*$');
var MQLKEY_CHAR_MUSTQUOTE = new RegExp('([^' + mqlkey_char + '])', 'g');

var mqlkey_quote = function (s) {
    if (MQLKEY_VALID.exec(s))   // fastpath
        return s;
    var convert = function(a, b) {
        var hex = b.charCodeAt(0).toString(16).toUpperCase();
        if (hex.length == 2)
            hex = '00' + hex;
        if (hex.length == 3)
            hex = '0' + hex;
        return '$' + hex;
    };
    x = s.replace(MQLKEY_CHAR_MUSTQUOTE, convert);
    if (x.charAt(0) == '-' || x.charAt(0) == '_') {
        x = convert(x,x.charAt(0)) + x.substr(1);
    }
    return x;
}

//console.log('/wikipedia/en/'+mqlkey_quote('Ádám_Pintér'))
