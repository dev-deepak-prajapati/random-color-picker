const container = document.querySelector('.container');

function randomColor() {
    return Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase();

        // 256 *256 *256 = 16777216
        // 0 se 16777215  : all possible color: 
        // toString(16)   : num to hexadecimal 
        // padStart(6,'0'): code digit 6 se less ho ,tb aage '0' lg jay
}

const colorList = Array.from({ length: 100 }, randomColor);

const fragment = document.createDocumentFragment();
colorList.forEach((color) => {
    const divEle = document.createElement('div');
    divEle.classList.add('color-card');
    divEle.style.background = `#${color}`;

    divEle.innerHTML = `
        <div class="showColorName">
            <span class="colorCode">#${color}</span>
            <button class="copy-btn" type="button">
                <i class="fa-regular fa-clone"></i>
            </button>
        </div>
    `;

    fragment.appendChild(divEle);
});
container.append(fragment);

container.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-btn');
    if (!copyBtn) return;
    
    const colorCard = copyBtn.closest('.color-card');
    const colorCode = colorCard.querySelector('.colorCode');
    const textToCopy = colorCode.textContent;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            const icon = copyBtn.querySelector('i');
            icon.className = 'fa-solid fa-check';

            setTimeout(() => {
                icon.className = 'fa-regular fa-clone';
            }, 1500);
        })
        .catch((err) => {
            console.error('Failed tto copy text: ', err);
        });
});
