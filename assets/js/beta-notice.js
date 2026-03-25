(function () {
    // Show only once per session (not every reload).
    // Remove or change 'sessionStorage' to 'localStorage' to show only once ever.
    if (sessionStorage.getItem('beta_dismissed')) return;

    const overlay = document.createElement('div');
    overlay.id = 'beta-overlay';
    overlay.innerHTML = `
        <div id="beta-modal" role="dialog" aria-modal="true" aria-labelledby="beta-title-text">
            <div class="beta-icon-wrapper">
                <i class="bi bi-rocket-takeoff-fill"></i>
            </div>
            <div class="beta-badge">Beta Release</div>
            <h2 class="beta-title" id="beta-title-text">
                You're viewing the<br>
                <span>Design Preview</span>
            </h2>
            <p class="beta-subtitle">
                This is the <strong style="color:rgba(255,255,255,0.9)">UI/Design Beta</strong> of Edvora Tech.<br>
                The full production platform is actively under development and will launch soon.
            </p>
            <div class="beta-divider"></div>
            <div class="beta-info-row">
                <div class="beta-info-item">
                    <i class="bi bi-palette-fill"></i>
                    <span>Design Preview</span>
                </div>
                <div class="beta-info-item">
                    <i class="bi bi-code-slash"></i>
                    <span>Laravel in Progress</span>
                </div>
                <div class="beta-info-item">
                    <i class="bi bi-shield-check"></i>
                    <span>Not Live Yet</span>
                </div>
            </div>
            <button id="beta-close-btn">
                <i class="bi bi-check-circle-fill me-2"></i>Got it, let me explore!
            </button>
            <p class="beta-skip" id="beta-skip-text">Don't show this again this session</p>
        </div>
    `;

    document.body.appendChild(overlay);

    function dismiss() {
        overlay.classList.add('hiding');
        overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
        sessionStorage.setItem('beta_dismissed', '1');
    }

    document.getElementById('beta-close-btn').addEventListener('click', dismiss);
    document.getElementById('beta-skip-text').addEventListener('click', dismiss);

    // Close if clicking the dark backdrop (outside the modal)
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) dismiss();
    });
})();
