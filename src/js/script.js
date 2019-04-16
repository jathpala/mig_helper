function mh_setText(id, value) {
    const element = $find(id);
    if (element) {
        element.set_value(value);
    }
}

function mh_setSimpleText(id, value) {
    const element = document.getElementById(id);
    console.log("setting simple text");
    if (element) {
        console.log("to " + value);
        element.value = value;
    }
}

function mh_setSelect(id, index) {
    const element = document.getElementById(id);
    if (element) {
        window.nextActiveElementId = "MainContent_chHeader_hTitle";
        element.value = index;
        element.onchange();
    }
}

function mh_messageHandler(event) {
    if (event.origin != "https://mig.registry.org.au") {
        return;
    }

    if (event.data.action) {
        console.log(event.data.action);
        if (event.data.action === "setText") {
            mh_setText(event.data.target, event.data.value);
        } else if (event.data.action === "setSimpleText") {
            mh_setSimpleText(event.data.target, event.data.value);
        } else if (event.data.action === "setSelect") {
            mh_setSelect(event.data.target, event.data.value);
        }
    }
}

window.addEventListener("message", mh_messageHandler);
