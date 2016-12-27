(() => {

    // check if the page is only showing a JSON object
    const bodyText = document.body.innerText;
    const theme = 'jp-dark-theme';

    document.body.classList.add(theme);

    try {
        const bodyJSON = JSON.parse(bodyText);

        // it's all JSON, baby!
        singlePageJSON.renderPage(bodyText);
    } catch (e) {
        // The text in the body isn't a valid JSON
    }

})();