let url = window.location.href;
let args = url.split("?");
args.shift();

/**
 * 
 * @param {string[]} args 
 */
const Args = (args) => {

    args.forEach(element => {
        let split = element.split("=");
        let key = split[0];
        let value = split[1];

        switch (key) {
            case "algName":
                Args.algName = value;
                break;
            case "imgData":
                let canvas = document.createElement("canvas");
                var image = new Image();
                image.onload = () => {
                    canvas.getContext("2d").drawImage(image, 0, 0);
                };
                image.src = `data:image/png;base64,${value}`;
                Args.canvas = canvas;
                break;
        }
    });
}
var output;

function getJson(args) {
    var jsonObject = {
        "data": encodeData(args)
    }

    output = JSON.stringify(jsonObject)
}

function saveToFile() {
    getJson();
    var jsonObjectAsString = output;

    var blob = new Blob([jsonObjectAsString], {
        //type: 'application/json'
        type: 'octet/stream'
    });
    console.log(blob);

    var anchor = document.createElement('a')
    anchor.download = "data.json";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.innerHTML = "download"
    anchor.click();

    console.log(anchor);

    document.getElementById('output').append(anchor)


}

getJson(args);



