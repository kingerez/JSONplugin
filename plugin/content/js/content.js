(() => {

    const theme = 'jp-dark-theme';

    document.body.classList.add(theme);

    function checkBodyForJson() {
        try {
            // check if the page is only showing a JSON object
            const bodyText = document.body.innerText;
            console.log(bodyText);
            const bodyJSON = JSON.parse(bodyText);

            // it's all JSON, baby!
            singlePageJSON.renderPage(bodyText);
        } catch (e) {
            // The text in the body isn't a valid JSON
        }
    }

    checkBodyForJson();

    setTimeout(checkBodyForJson, 1000);

})();