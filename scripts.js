function navigate(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

document.getElementById('scriptForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('scriptTitle').value;
    const content = document.getElementById('scriptContent').value;
    const scriptsList = document.getElementById('scriptsList');
    const noScriptsMsg = document.getElementById('noScriptsMsg');

    if (noScriptsMsg) {
        noScriptsMsg.remove();
    }

    const scriptBox = document.createElement('div');
    scriptBox.className = 'script-box';
    scriptBox.innerHTML = `
        <h3>${title}</h3>
        <pre id="code-${title}">${content}</pre>
        <button class="copy-btn" onclick="copyScript('code-${title}')">📋 نسخ السكربت</button>
    `;

    scriptsList.appendChild(scriptBox);
    this.reset();
});

function copyScript(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('تم نسخ السكربت!');
    });
}
