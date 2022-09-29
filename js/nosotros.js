function getDataUrl() {
    const search = window.location.search
    const urlHTML = new URLSearchParams(search)
    const username = urlHTML.get("username")
    return username
}

function main() {
    if (sessionStorage.getItem("AuthenticationState") === null) {
        document.getElementById("inicio").href = "index.html"
    }
    else {
        const username = getDataUrl()
        document.getElementById("inicio").href = "inicio.html?username=" + username
        document.getElementById("ayuda").href = "ayuda.html?username=" + username
    }
}

main()