function save() {
    let username = document.getElementsByName("username")[0].value;
    let site = document.getElementsByName("site")[0].value;

    chrome.storage.sync.set({
        username: username,
        site: site
    });
}

document.getElementById("submit").addEventListener("click", save);

chrome.storage.sync.get(["username", "site"], (items) => {
    document.getElementsByName("username")[0].value = items["username"] || "";
    document.getElementsByName("site")[0].value = items["site"] || "";
});
