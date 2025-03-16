function navigate(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// حفظ السكربتات عند النشر في localStorage
document.getElementById('scriptForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('scriptTitle').value;
    const content = document.getElementById('scriptContent').value;
    const scriptsList = document.getElementById('scriptsList');
    const noScriptsMsg = document.getElementById('noScriptsMsg');

    if (noScriptsMsg) {
        noScriptsMsg.remove();
    }

    // حفظ السكربت في localStorage
    let scripts = JSON.parse(localStorage.getItem('scripts')) || [];
    const newScript = { title, content };
    scripts.push(newScript);
    localStorage.setItem('scripts', JSON.stringify(scripts));

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

// عند تحميل الصفحة، استرجاع السكربتات من localStorage
window.addEventListener('load', () => {
    const scripts = JSON.parse(localStorage.getItem('scripts')) || [];
    const scriptsList = document.getElementById('scriptsList');

    scripts.forEach(script => {
        const scriptBox = document.createElement('div');
        scriptBox.className = 'script-box';
        scriptBox.innerHTML = `
            <h3>${script.title}</h3>
            <pre id="code-${script.title}">${script.content}</pre>
            <button class="copy-btn" onclick="copyScript('code-${script.title}')">📋 نسخ السكربت</button>
        `;
        scriptsList.appendChild(scriptBox);
    });
});

function copyScript(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('
