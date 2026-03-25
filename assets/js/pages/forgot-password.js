const form = document.getElementById("forgotForm");
        const alertBox = document.getElementById("alertBox");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();

            if (!email) {
                showAlert("Please enter your email address.", "danger");
                return;
            }

            // Demo success message
            showAlert(
                "If this email exists, a reset link has been sent.",
                "success"
            );

            form.reset();
        });

        function showAlert(message, type) {
            alertBox.className = `alert alert-${type}`;
            alertBox.innerText = message;
            alertBox.classList.remove("d-none");
        }