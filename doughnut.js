Raphael.fn.Doughnut = function (cx, cy, r, stroke_width, datas, total) {
    var paper = this, rad = Math.PI / 180;
    this.colors = ["#84a200", "#9834a4", "#498aa4", "#a8a414", "#a48854"];
    this.total = total;
    this.stroke_width = stroke_width;
    this.datas = datas;
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.chart = this.set();

    var tAngle = 0;
    var dataLen = this.datas.length;
    var width = (this.r - this.stroke_width / 2) * Math.sqrt(2);
    var widthInterval = width / dataLen;

    this.chart.push(paper.circle(this.cx, this.cy, this.r + stroke_width / 2 + 1).attr({ stroke: "#fff", "stroke-width": 2, fill: "#eee" }));
    this.chart.push(paper.circle(this.cx, this.cy, this.r - stroke_width / 2 - 1).attr({ stroke: "#fff", "stroke-width": 2, fill: "#f7f7f7" }))

    this.pieAnimation = function (pie,count, startAngle, endAngle, finish) {

        var x1 = this.cx + this.r * Math.sin(startAngle * rad);
        var y1 = this.cy - this.r * Math.cos(startAngle * rad);

        if (!finish) finish = function () { }

        var callback = function (pie, cx, cy, r, x1, y1,startAngle, endAngle, percent) {
            if (percent > count) {
                finish()
            } else {
                animation(pie, cx, cy, r, x1, y1, startAngle, endAngle, percent)
            }
        }

        var animation = function (pie, cx, cy, r, x1, y1, startAngle, endAngle, percent) {

            var angle = startAngle + (endAngle - startAngle) * percent / count;
            var x2 = cx + r * Math.sin(angle * rad);
            var y2 = cy - r * Math.cos(angle * rad);

             
            pie.animate({ path: [["M", x1, y1], ["A", r, r, startAngle, +((angle - startAngle) > 180), 1, x2, y2]] }, 10, "linear", function () {
                percent++;
                callback(pie, cx, cy, r, x1, y1, startAngle, endAngle, percent)
            })
        }

        pie.attr({ path: [["M", x1, y1], ["A", r, r, startAngle, +(startAngle > 180), 1, x1, y1]] });
        animation(pie, this.cx, this.cy, this.r, x1, y1, startAngle, endAngle, 0)
    }


    for (var i = 0; i < this.datas.length; i++) {
        var startAngle = tAngle;
        var aInterval = (this.datas[i].value / this.total) * 360;
        var endAngle = startAngle+aInterval;

        var x1 = this.cx + this.r * Math.sin(startAngle * rad);
        var y1 = this.cy - this.r * Math.cos(startAngle * rad);

        var x2 = this.cx + this.r * Math.sin(endAngle * rad);
        var y2 = this.cy - this.r * Math.cos(endAngle * rad);

        var pie = paper.path([["M", x1, y1], ["A", this.r, this.r, startAngle, +(aInterval > 180), 1, x2, y2]]).attr({ stroke: this.colors[i % 5], "stroke-width": this.stroke_width });
        this.chart.push(pie);
        tAngle = endAngle;


        var tY = this.cy - width / 2 + widthInterval * i+20;
        this.chart.push(
            paper.text(this.cx - 10, tY, this.datas[i].label).attr({ "text-anchor": "start", "font-size": 14, "fill": "#444", "opacity": 0 })
            .animate({ "opacity": 1 }, 1000, "linear", function () { })
        );
        this.chart.push(
            paper.path([["M", this.cx - 60, tY], ["L", this.cx - 15, tY]]).attr({ stroke: this.colors[i % 4], "stroke-width": 16, "opacity": 0 })
            .animate({ "opacity": 1 }, 1000, "linear", function () { })
        );

        this.pieAnimation(pie,30,startAngle,endAngle)
    }





    return this;
}