// Password strength indicator
        document.getElementById('password').addEventListener('input', function () {
            const password = this.value;
            const strengthDiv = document.getElementById('passwordStrength');
            const strengthBar = document.getElementById('strengthBar');
            const strengthText = document.getElementById('strengthText');

            if (password.length > 0) {
                strengthDiv.style.display = 'block';
                const strength = checkPasswordStrength(password);

                let strengthClass = '';
                let strengthLabel = '';

                if (strength.score <= 2) {
                    strengthClass = 'bg-danger';
                    strengthLabel = 'Weak';
                } else if (strength.score <= 3) {
                    strengthClass = 'bg-warning';
                    strengthLabel = 'Medium';
                } else {
                    strengthClass = 'bg-success';
                    strengthLabel = 'Strong';
                }

                strengthBar.className = `progress-bar ${strengthClass}`;
                strengthBar.style.width = `${(strength.score / 5) * 100}%`;
                strengthText.textContent = `${strengthLabel} - ${strength.feedback.join(', ')}`;
            } else {
                strengthDiv.style.display = 'none';
            }
        });