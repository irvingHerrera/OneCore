(() => {
    'use strict';

    angular.post = function (path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }
        //add xsrf
        var input = document.getElementById("XsrfRequestToken");
        if (input) {
            var aft = document.createElement("input");
            aft.setAttribute("type", "hidden");
            aft.setAttribute("name", "__RequestVerificationToken");
            aft.setAttribute("value", input.value);
            form.appendChild(aft);
        }
        document.body.appendChild(form);
        form.submit();

    };

})();