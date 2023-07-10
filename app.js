var width = window.innerWidth;
var height = window.innerHeight;

function getData() {
    return {
        '87': {
            x: 468,
            y: 244
        },
        '88': {
            x: 488,
            y: 244
        },
        '89': {
            x: 511,
            y: 244
        },
        '90': {
            x: 531,
            y: 244
        },
        '91': {
            x: 550,
            y: 244
        },
        '92': {
            x: 568,
            y: 244
        },
        '93': {
            x: 588,
            y: 244
        },
        '94': {
            x: 608,
            y: 244
        },
    };
}
function updateTooltip(tooltip, x, y, text) {
    tooltip.getText().text(text);
    tooltip.position({
        x: x,
        y: y,
    });
    tooltip.show();
}
var stage = new Konva.Stage({
    container: 'map',
    width: width,
    height: height,
});
let imgLayer = new Konva.Layer();
let shapesLayer = new Konva.Layer();
let tooltipLayer = new Konva.Layer();

let tooltip = new Konva.Label({
    opacity: 0.75,
    visible: false,
    listening: false,
});

tooltip.add(
    new Konva.Tag({
        fill: 'black',
        pointerDirection: 'down',
        pointerWidth: 10,
        pointerHeight: 10,
        lineJoin: 'round',
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowOpacity: 0.5,
    })
);

tooltip.add(
    new Konva.Text({
        text: '',
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'white',
    })
);

tooltipLayer.add(tooltip);

// get areas data
var areas = getData();

// draw areas
for (var key in areas) {
    var area = areas[key];
    var points = area.points;

    var shape = new Konva.Rect({
        x: area.x,
        y: area.y,
        width: 20,
        height: 43,
        fill: "teal",
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        opacity: 0.3,
        key: key,
    });

    // var shape = new Konva.Line({
    //     points: points,
    //     fill: area.color,
    //     opacity: 1,
    //     closed: true,
    //     // custom attr
    //     key: key,
    // });

    shapesLayer.add(shape);
}


stage.on('click', function (e) {
    var mousePos = stage.getPointerPosition();
    console.log(mousePos);
});

let imageObj = new Image();
imageObj.onload = function () {
    let img = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: 1226,
        height: 700,
    });

    // add the shape to the layer
    imgLayer.add(img);
};
imageObj.src = 'automap.png';


stage.add(imgLayer);
stage.add(shapesLayer);
stage.add(tooltipLayer);

shapesLayer.on('mouseover', function (evt) {
    var shape = evt.target;
    if (shape) {
        shape.opacity(0.5);
        tooltip.show();
    }
});
shapesLayer.on('mouseout', function (evt) {
    var shape = evt.target;
    if (shape) {
        shape.opacity(0.3);
        tooltip.hide();
    }
});
shapesLayer.on('mousemove', function (evt) {
    var shape = evt.target;
    if (shape) {
        var mousePos = stage.getPointerPosition();
        var x = mousePos.x;
        var y = mousePos.y - 5;
        updateTooltip(tooltip, x, y, shape.attrs.key);
    }
});

stage.on('mousemove', function (e) {
    // var mousePos = stage.getPointerPosition();
    // console.log(mousePos);
})