function run() {
    const site = document.getElementsByName("site")[0].value;
    const username = document.getElementsByName("username")[0].value;
    const password = document.getElementsByName("password")[0].value;
    const id = document.getElementsByName("id")[0].value;

    getData(id).then((data) => {
        sendAutofillRequest(data);
    });
}

async function getData(id) {
    return new Promise(function(resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("GET", "file:///home/jpala/Desktop/test.json");
        request.onload = function() {
            let data = JSON.parse(request.responseText);
            console.log(data);
            resolve(data);
        };
        request.onerror = function() {
            reject(Error("Error loading JSON data."));
        };
        request.send()
    });
}

function sendAutofillRequest(data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("Received");
        console.log(data);
        chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
            if (response) {
                console.log("Autofill successful.");
            } else {
                console.log("Autofill failed.");
            }
        });
    });
}

document.getElementById("autofill").addEventListener("click", run);

chrome.storage.sync.get(["username", "site"], (items) => {
    document.getElementsByName("username")[0].value = items["username"] || "";
    document.getElementsByName("site")[0].value = items["site"] || "";
});
