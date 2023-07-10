console.log("Init");

const canvas = document.getElementById('canva-map')

const width = canvas.width = innerWidth
const height = canvas.height = innerHeight

console.log(width, height);

const imageWidth = 1226;
const imageHeight = 700;

const context = canvas.getContext('2d')


drawing = new Image()
drawing.src = "automap.png"
drawing.width = width / (imageWidth / 100)
drawing.height = height / (imageHeight / 100)

let map = {
    width: imageWidth,
    height: imageHeight,
    offset: {x: 0, y: 0},
    scale: {w: imageWidth, h: imageHeight},
    zoom: width / (imageWidth / 100),
    deltaZoom: 50,
    img: drawing,
    ZoomHandler: function (delta) {
        devInfo("delta", delta)
        devInfo("scale.w", (this.scale.w));
        devInfo("zoom", (this.zoom));
        devInfo("map width", (this.width));
        devInfo("width", (width));

        let zoom = this.zoom;

        if (delta > 0) {
            zoom += this.deltaZoom;
        } else if (delta < 0) {
            zoom -= this.deltaZoom;
        } else {
            zoom = width / (imageWidth / 100);
            this.scale = {
                w: zoom * (imageWidth / 100),
                h: zoom * (imageHeight / 100),
            }
            this.zoom = zoom;
            return;
        }

        let newWidth = zoom * (this.width / 100);
        let newHeight = zoom * (this.height / 100);

        if (newWidth <= width) {
            zoom = width / (imageWidth / 100);
            this.zoom = zoom;
            this.UpdateSize(zoom * (this.width / 100), zoom * (this.height / 100));
            return;
        }

        this.zoom = zoom;
        this.UpdateSize(newWidth, newHeight);
    },
    UpdateSize: function (nw, nh) {
        this.scale = {w: nw, h: nh};
        this.offset = {
            x: (width / 2) - (this.scale.w / 2),
            y: (height / 2) - (this.scale.h / 2),
        }
    }
}


map.img.onload = function() {
    console.log(123123);
    console.log(map);
    map.ZoomHandler(0)
    renderMap(map)
};

canvas.addEventListener('wheel',function(e){
    //console.log("scroll", event)
    map.ZoomHandler(e.wheelDelta);
    renderMap(map);

    e.preventDefault();
}, false);

function renderMap(m) {
    context.clearRect(0, 0, width, height);
    context.strokeRect(0, 0, width, height);
    context.drawImage(m.img, m.offset.x, m.offset.y, m.scale.w, m.scale.h);
}

function devInfo(name, val) {
    let infoDiv = document.getElementById("dev")
    let el = document.getElementById(name)
    if (el === null || el.length === 0) {
        el = document.createElement("div")
        el.id = name
        infoDiv.append(el)
    }

    console.dir({
        name: name,
        value: val
    });
    el.textContent = name + ": " + val
}