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
        <button class="delete-btn" onclick="deleteScript('${title}')">❌ حذف السكربت</button>
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
            <button class="delete-btn" onclick="deleteScript('${script.title}')">❌ حذف السكربت</button>
        `;
        scriptsList.appendChild(scriptBox);
    });
});

// نسخ السكربت إلى الحافظة
function copyScript(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('تم نسخ السكربت!');
    });
}

// حذف السكربت
function deleteScript(title) {
    let scripts = JSON.parse(localStorage.getItem('scripts')) || [];
    scripts = scripts.filter(script => script.title !== title);
    localStorage.setItem('scripts', JSON.stringify(scripts));

    // تحديث العرض بعد الحذف
    window.location.reload();
}

// نظام تسجيل الدخول
let users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('اسم المستخدم موجود بالفعل!');
    } else {
        const newUser = { username, password, role: 'guest' }; // role يمكن أن يكون guest أو admin
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('تم إنشاء الحساب بنجاح!');
    }
});

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('تم تسجيل الدخول بنجاح!');
        // حفظ حالة الدخول للمستخدم
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.reload(); // إعادة تحميل الصفحة بعد الدخول
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
});

// التحقق من حالة تسجيل الدخول
window.addEventListener('load', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('welcomeMessage').innerText = `مرحباً بك، ${loggedInUser.username}`;
        if (loggedInUser.role === 'admin') {
            // السماح له بنشر السكربتات
            document.getElementById('scriptForm').style.display = 'block';
        }
    } else {
        document.getElementById('scriptForm').style.display = 'none';
    }
});
