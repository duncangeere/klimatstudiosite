'use strict'

const r = new Rune({
    container: "body",
    width: 1000,
    height: 600,
    debug: true
});

function graphic() {

    // Grab the data
    async function getData() {
        const response = await fetch("https://global-warming.org/api/co2-api");
        const data = await response.json();
        return data
    }

    // Draw the visual
    function drawSpiral (data) {

        const margin = 20;

        // Parse the data from the JSON into an array
        const dat = [];
        for (let datum of data.co2) {
            dat.push(datum.cycle);
        }

        // Get just the last 365 entries
        const d = dat.slice(-730)

        // Loop over the data
        for (let i = 0; i < d.length; i++) {

            // Map it to viewable lengths
            length = Rune.map(d[i], Math.min(...d), Math.max(...d), 0, r.height);

            // Calculate x position
            const x = +((margin + i * (r.width-margin*2) / d.length).toFixed(2));

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