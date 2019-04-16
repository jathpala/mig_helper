function autofill(request, sender, sendResponse) {
    const page = getCurrentPage();
    if (page === "admission") {
        autofill_admission(request.admission) ? success(sendResponse) : fail(sendResponse);
    } else if (page === "clinical") {
        autofill_clinical(request.clinical) ? success(sendResponse) : fail(sendResponse);
    } else if (page === "visit") {
        autofill_visit(request.visit) ? success(sendResponse) : fail(sendResponse);
    } else if (page === "procedure") {
        autofill_procedure(request.procedure) ? success(sendResponse) : fail(sendResponse);
    } else if (page === "post") {
        autofill_post(request.post) ? success(sendResponse) : fail(sendResponse);
    } else if (page === "discharge") {
        autofill_discharge(request.discharge) ? success(sendResponse) : fail(sendResponse);
    } else {
        alert("Sorry, you cannot use autofill for this page.");
        fail(sendResponse);
    }
}

function getCurrentPage() {
    let page = null;
    try {
        switch(document.getElementById("MainContent_chHeader_hTitle").innerHTML) {
        case "Admission Data":
            page = "admission";
            break;
        case "Clinical Presentation Information":
            page = "clinical";
            break;
        case "Cath Lab Visit Information":
            page = "visit";
            break;
        case "Procedure Information":
            page = "procedure";
            break;
        case "Post Procedure":
            page = "post";
            break;
        case "Discharge":
            page = "discharge";
            break;
        }
    } catch (e) {
        if (e instanceof TypeError) {
            page = null;
        } else {
            throw e;
        }
    }

    return page;
}

function autofill_admission(data) {
    console.log(data);
    alert("Autofilling admission");

    let element = null;

    // Admission Status
    //element = document.getElementById("MainContent_ddlAdStat");
    let index = 0;
    let ad_other = "";
    if (data.ad_status) {
        switch (data.ad_status) {
        case "referral":
            index = 1;
            break;
        case "elective":
            index = 2;
            break;
        case "ed":
            index = 3;
            break;
        case "transfer":
            index = 4;
            break;
        case "other":
            index = 5;
            ad_other = data.ad_other;
            break;
        }
        window.postMessage({
            action: "setSelect",
            target: "MainContent_ddlAdStat",
            value: index
        });
        window.postMessage({
            action: "setSimpleText",
            target: "MainContent_tbAdStatOt",
            value: ad_other
        });
    }

    // Admission Date and Time
    if (data.ad_date) {
        window.postMessage({
            action: "setText",
            target: "ctl00_MainContent_rdpAdmDt_dateInput",
            value: data.ad_date
        });
    }
    if (data.ad_time) {
        window.postMessage({
            action: "setText",
            target: "ctl00_MainContent_rtpPciHospArrTm_dateInput",
            value: data.ad_time
        });
    }

    // Procedure Date and Time
    if (data.proc_date) {
        window.postMessage({
            action: "setText",
            target: "ctl00_MainContent_rdpProcDt_dateInput",
            value: data.proc_date
        });
    }
    if (data.proc_time) {
        window.postMessage({
            action: "setText",
            target: "ctl00_MainContent_rtpProcTm_dateInput",
            value: data.proc_time
        });
    }

    // Number of Cath Lab Visits this Admission
    if (data.n_visits) {
        window.postMessage({
            action: "setText",
            target: "ctl00_MainContent_tbCathVis",
            value: data.n_visits
        });
    }

}

function autofill_clinical(data) {
    console.log(data);
    alert("Autofilling clinical");
}

function autofill_visit(data) {
    console.log(data);
    alert("Autofilling visit");
}

function autofill_procedure(data) {
    console.log(data);
    alert("Autofilling procedure");
}

function autofill_post(data) {
    console.log(data);
    alert("Sorry, autofilling post-procedure data is not currently supported.");
    return false;
}

function autofill_discharge(data) {
    console.log(data);
    alert("Sorry, autofilling discharge data is not currently supported.");
    return false;
}

function success(sendResponse) {
    sendResponse(true);
}

function fail(sendResponse) {
    sendResponse(false);
}

// Add an event listener for the autofill button
chrome.runtime.onMessage.addListener(autofill);

// Embed a script element to allow access to the page's javascript context
const script = document.createElement("script");
script.src = chrome.extension.getURL("script.js");
(document.head || document.documentElement).appendChild(script);
