const CSS_NOTE = 'note';
const CSS_YELLOW = 'yellow';
const CSS_RED = 'red';

let handleFile;

document.querySelector('#reload').addEventListener('click', async () => {
    [handleFile] = await window.showOpenFilePicker();
    const file = await handleFile.getFile();
    const fileContents = await file.text();
    document.querySelector('.note-area').innerHTML = fileContents;
    document.querySelector('#save').classList.replace('header-btn-disabled', 'header-btn');
    addDeleteBtnClickEvent();
});

document.querySelector('#save').addEventListener('click', async () => {
    const noteAreaHTML = document.querySelector('.note-area').innerHTML;
    const writable = await handleFile.createWritable();
    await writable.write(noteAreaHTML);
    await writable.close();
    popSaveMessage();
});

document.querySelector('#newNote').onclick = () => {
    createNote(CSS_YELLOW);
    const noteText = document.querySelector('.note-area > .note:last-child > .note-text');
    focusAndSelect(noteText);
};

document.querySelector('#newRedNote').onclick = () => {
    createNote(CSS_RED);
    const noteText = document.querySelector('.note-area > .note:first-child > .note-text');
    focusAndSelect(noteText);
};

const addDeleteBtnClickEvent = () => {
    document.querySelectorAll('.delete-btn').forEach((e) => {
        e.addEventListener('click', (e) => {
            e.target.parentNode.parentNode.remove();
        });
    });
}

/**
 * 指定のCSSを付与して、新規メモを作成する
 * delete-btn押下イベントリスナー追加
 * css:yellow => note-area の末尾に追加
 * css:red    => note-area の先頭に追加
 * 
 * @param {string} colorCss 色指定CSS
 */
function createNote(colorCss) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add(CSS_NOTE, colorCss);
    noteDiv.insertAdjacentHTML('afterbegin', `
        <div class="note-btn-area">
          <div class="delete-btn">×</div>
        </div>
        <pre contenteditable='true' class='note-text'>Write_here</pre>`);
    noteDiv.firstElementChild.firstElementChild.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.remove();
    });
    if (colorCss === CSS_YELLOW) {
        document.querySelector('.note-area').appendChild(noteDiv);
    }
    if (colorCss === CSS_RED) {
        document.querySelector('.note-area').prepend(noteDiv);
    }
}

/**
 * 指定要素を全選択・フォーカスする。
 * 
 * @param {HTMLElement} element
 */
function focusAndSelect(element) {
    element.focus();
    const range = document.createRange();
    range.selectNodeContents(element);
    window.getSelection().removeAllRanges(); // Chromeだと選択要素が設定されていると、addRange()で警告が発生して実行されない。
    window.getSelection().addRange(range);
}

/**
 * 保存完了メッセージをmodalでポップする。
 */
function popSaveMessage() {
    const modal = document.querySelector('#modal');
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    setTimeout(() => {
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
    }, 750);
}
