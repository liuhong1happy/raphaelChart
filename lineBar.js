Raphael.fn.barChart = function (x,y,width,height,miny, maxy, labels, datas) {

    var paper = this, rad = Math.PI / 180;
    this.chart = this.set();
    this.miny = miny;
    this.maxy = maxy;
    this.labels = labels;
    this.datas = datas;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.chart.push(paper.path(["M", this.x + 40, this.y + 20, "L", this.x + 40, this.y + this.height - 40]).attr({ stroke: "rgba(0,0,0,.1)" }));
    this.chart.push(paper.path(["M", this.x + 35, this.y + this.height - 45, "L", this.x + this.width, this.y + this.height - 45]).attr({ stroke: "rgba(0,0,0,.1)" }));

    var yInterval = (height - 80) / 10;
    var yS = (maxy-miny)/10
    for (var i = 0; i <= 10; i++) {
        var tY = this.y + 40 + yInterval * i;
        this.chart.push(paper.text(this.x + 30, tY - 5, maxy - yS * i).attr({ "text-anchor": "end", fill: "#666", "font-size": 12 }));
        this.chart.push(paper.path(["M", this.x + 35, tY - 5, "L", this.x + this.width, tY - 5]).attr({ stroke: "rgba(0,0,0,.1)" }));
    }

    var len = labels.length;
    var xInterval = (this.width - 40) / len;
    for (var i = 0; i < len; i++) {
        var label = labels[i];
        var data = datas[i];
        var tHeight = (this.height - 80) * (data - miny) / (maxy - miny);
        var tX = this.x + 40 + xInterval * (i + 0.5);
        var tY =this.y + this.height - 45 - tHeight;

        this.chart.push(paper.text(tX, this.y + height - 30, label).attr({ fill: "#666","font-size":12 }));
        this.chart.push(
            paper.rect(tX - 7, tY + tHeight, 14, 0).attr({ fill: "rgba(151,187,205,0.5)", stroke: "rgba(151,187,205,1)", "stroke-width": 1 })
                 .animate({y:tY,height:tHeight},1000)
         )
        this.chart.push(
            paper.text(tX, tY + tHeight - 15, data).attr({ fill: "rgba(151,187,205,0.5)", "font-size": 16, stroke: "rgba(151,187,205,1)", "stroke-width": 1 })
                 .animate({ y: tY-10}, 1000)
         )
    }

    return this;
};
