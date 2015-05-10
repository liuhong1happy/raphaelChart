Raphael.fn.pieChart = function (cx, cy, r, angle, label, fill) {
    var paper = this,rad = Math.PI / 180;
    this.chart = this.set();
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.angle = angle==360?359.9:angle;
    this.label = label;
    this.fill = fill;

    this.pie_params = { fill: this.fill, stroke: "#fff", "stroke-width": 3 };
    this.circle_parmas = { fill: "#ddd", stroke: "#fff", "stroke-width": 3 };
    this.txt_parmas = { fill:this.angle<200?"#444": "#fff","font-size":24,"font-family":"Î¢ÈíÑÅºÚ" };

    this.x1 = this.cx;
    this.y1 = this.cy-this.r;
    this.x2 = this.cx + this.r * Math.sin(this.angle * rad);
    this.y2 = this.cy - this.r * Math.cos(this.angle * rad);



    this.circle = paper.circle(this.cx, this.cy, this.r).attr(this.circle_parmas);
    this.pie = paper.path(["M", this.cx, this.cy, "L", this.x1, this.y1, "A", this.r, this.r, 0, +(this.angle > 180), 1, this.x2, this.y2, "z"]).attr(this.pie_params);
    this.txt = paper.text(this.cx, this.cy +this.r/2, this.label).attr(this.txt_parmas);
    
    

    this.chart.push(this.pie);
    this.chart.push(this.circle);
    this.chart.push(this.txt);



    this.pieAnimation = function (count,finish) {
        if (!finish) finish = function () { }

        var callback = function (pie, cx, cy, r, x1, y1, angle, percent) {
            if (percent > count) {
                finish()
            } else {
                animation(pie, cx, cy, r, x1, y1, angle, percent)
            }
        }

        var animation = function (pie, cx, cy, r, x1, y1, angle, percent) {
            var x2 = cx + r * Math.sin(angle * percent / count * rad);
            var y2 = cy - r * Math.cos(angle * percent / count * rad);
            pie.animate({ path: ["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(angle * percent / count > 180), 1, x2, y2, "z"] }, 10, "linear", function () {
                percent++;
                callback(pie, cx, cy, r, x1, y1, angle, percent)
            })
        }

        this.pie.attr({ path: ["M", this.cx, this.cy, "L", this.x1, this.y1, "A", this.r, this.r, 0, +(0 > 180), 1, this.x1, this.y1, "z"] });
        animation(this.pie, this.cx, this.cy, this.r, this.x1, this.y1, this.angle, 0, callback)
    }



    return this;
};
