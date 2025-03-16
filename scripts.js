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

    const scriptItem = document.createElement('div');
    scriptItem.innerHTML = `
        <button class="script-btn" onclick="toggleScript(this)">📄 ${title}</button>
        <div class="script-content">
            <pre>${content}</pre>
            <button class="save-btn" onclick="saveScript('${title}', \`${content}\`)">💾 حفظ السكربت</button>
        </div>
    `;
    scriptsList.appendChild(scriptItem);
    this.reset();
});

function toggleScript(button) {
    const contentDiv = button.nextElementSibling;
    contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
}

function saveScript(filename, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.txt`;
    link.click();
}
