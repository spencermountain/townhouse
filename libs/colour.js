// Generated by CoffeeScript 1.6.3
var colourscheme, getcolour;

getcolour = function() {
    var colours;
    colours = ["#525b84", "#819bea", "#8c638c", "#b8cf87", "#8baabb", "#819bea", "paleturquoise", "salmon", "darkred", "saddlebrown", "mediumpurple", "lightsteelblue", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];
    return colours[Math.floor(Math.random() * colours.length)];
};

colourscheme = {
    browns: function(a) {
        var b, g, r;
        if (a == null) {
            a = 0.8;
        }
        r = Math.floor(Math.random() * 100) + 100;
        g = (Math.floor(Math.random() * 3) + 2) * 25;
        b = 49;
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    },
    reds: function(a) {
        var b, g, r;
        if (a == null) {
            a = 0.8;
        }
        r = Math.floor(Math.random() * 100) + 100;
        g = 44;
        b = 49;
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    },
    blues: function(a) {
        var b, g, r;
        if (a == null) {
            a = 0.8;
        }
        r = Math.floor(Math.random() * 50) + 30;
        g = Math.floor(Math.random() * 30) + 100;
        b = 180;
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    },
    bluebrowns: function(a) {
        if (a == null) {
            a = 0.8;
        }
        if (Math.round(Math.random())) {
            return colourscheme.blues(a);
        } else {
            return colourscheme.browns(a);
        }
    }
};