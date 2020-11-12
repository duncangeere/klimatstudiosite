'use strict'

const r = new Rune({
    container: "body",
    width: 1200,
    height: 600,
    debug: true
});

function graphic() {

    async function getData() {
        const response = await fetch("https://api.v2.emissions-api.org/api/v2/ozone/average.json");
        const data = await response.json();
        return data
    }

    function drawSpiral (data) {

        const d = [];

        for (let datum of data) {
            d.push(datum.average);
        }

        for (let i = 0; i < d.length; i++) {
            length = Rune.map(d[i], Math.min(...d), Math.max(...d), 0, r.height);
            const x = +((10 + i * (r.width-20) / d.length).toFixed(2));
            r.line(x, r.height, x, r.height - length);
        }

        r.draw()
    }

    getData().then(data => drawSpiral(data)).catch(error => console.error(error));

}

// Draw it 
graphic();
r.draw();