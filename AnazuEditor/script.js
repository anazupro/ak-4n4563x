// Elemen DOM
const mainPage = document.querySelector('.main-page');
const editorPage = document.getElementById('editor-page');
const createProjectBtn = document.getElementById('create-project');
const cloneProjectBtn = document.getElementById('clone-project');
const createDrawer = document.getElementById('create-drawer');
const createFileBtn = document.getElementById('create-file');
const fileList = document.getElementById('file-list');
const tabList = document.getElementById('tab-list');
const editor = document.getElementById('editor');

// Data Proyek
let currentProject = { files: {} };
let activeFile = null;

// Drawer untuk Create Proyek
createProjectBtn.addEventListener('click', () => {
    createDrawer.classList.add('active');
});

function closeDrawer() {
    createDrawer.classList.remove('active');
}

// Membuat Proyek
function createProject(type) {
    const name = prompt('Nama Proyek:');
    if (name) {
        currentProject = { name, files: {} };
        mainPage.style.display = 'none';
        editorPage.style.display = 'flex';
        closeDrawer();
    }
}

// Membuat File Baru
createFileBtn.addEventListener('click', () => {
    const fileName = prompt('Nama File (contoh: index.html):');
    if (fileName && !currentProject.files[fileName]) {
        currentProject.files[fileName] = '';
        updateFileList();
        openFile(fileName);
    }
});

// Update Daftar File
function updateFileList() {
    fileList.innerHTML = '';
    for (const file in currentProject.files) {
        const li = document.createElement('li');
        li.textContent = file;
        li.onclick = () => openFile(file);
        fileList.appendChild(li);
    }
}

// Membuka File di Tab
function openFile(fileName) {
    activeFile = fileName;
    editor.innerText = currentProject.files[fileName];
    editor.dataset.currentFile = fileName;
    updateTabs();
    highlightSyntax();
}

// Update Tab
function updateTabs() {
    tabList.innerHTML = '';
    for (const file in currentProject.files) {
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.textContent = file;
        if (file === activeFile) tab.classList.add('active');
        tab.onclick = () => openFile(file);
        tabList.appendChild(tab);
    }
}

// Simpan dan Highlight Saat Ketik
editor.addEventListener('input', () => {
    if (activeFile) {
        currentProject.files[activeFile] = editor.innerText;
        highlightSyntax();
    }
});

// Placeholder untuk Clone Proyek
cloneProjectBtn.addEventListener('click', () => {
    alert('Fitur Clone Proyek belum diimplementasikan.');
});

// Fungsi Highlight Utama
function highlightSyntax() {
    const fileName = editor.dataset.currentFile || '';
    const ext = fileName.match(/\.\w+$/)?.[0] || '';
    const content = editor.innerText;
    let highlighted = content;

    // Panggil fungsi highlight dari file bahasa
    if (window.highlightRules && window.highlightRules[ext]) {
        highlighted = window.highlightRules[ext](content);
    }

    editor.innerHTML = highlighted;
}