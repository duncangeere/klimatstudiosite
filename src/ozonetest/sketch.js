'use strict'

const r = new Rune({
    container: "body",
    width: 1200,
    height: 600,
    debug: true
});

function graphic() {

    // Grab the data
    async function getData() {
        const response = await fetch("https://api.v2.emissions-api.org/api/v2/ozone/average.json");
        const data = await response.json();
        return data
    }

    // Draw the visual
    function drawSpiral (data) {

        // Parse the data from the JSON into an array
        const dat = [];
        for (let datum of data) {
            dat.push(datum.average);
        }

        // Get just the last 365 entries
        const d = dat.slice(-365)

        // Loop over the data
        for (let i = 0; i < d.length; i++) {

            // Map it to viewable lengths
            length = Rune.map(d[i]-0.05, 0, Math.max(...d), 0, r.height);

            // Calculate x position
            const x = +((10 + i * (r.width-20) / d.length).toFixed(2));

            // Draw each line
            r.line(x, r.height, x, r.height - length);
        }

        r.draw()
    }

    // Make it all happen
    getData().then(data => drawSpiral(data)).catch(error => console.error(error));

}

// Draw it 
graphic();
r.draw();