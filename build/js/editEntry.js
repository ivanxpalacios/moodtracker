(function() {

    // Events
    document.addEventListener('DOMContentLoaded', createsURL);


    // Functions
    function createsURL() {
        const paramsURL = new URLSearchParams(window.location.search);

        const idEntry = parseInt(paramsURL.get('id'));

        console.log(idEntry);
    }
})();