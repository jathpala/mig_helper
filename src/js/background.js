chrome.runtime.onInstalled.addListener(function() {

    const match = [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "mig.registry.org.au" }
        })
    ];
    const action = [
        new chrome.declarativeContent.ShowPageAction()
    ];

    const rule = {
        conditions: match,
        actions: action
    };

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([rule]);
    });

});
