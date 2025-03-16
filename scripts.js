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
    scriptItem.innerHTML = `<h3>${title}</h3><p>السكربت محفوظ ولا يمكن نسخه.</p>`;
    
    scriptsList.appendChild(scriptItem);
    this.reset();
});
