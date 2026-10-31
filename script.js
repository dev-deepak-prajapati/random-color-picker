const container = document.querySelector('.container');

function randomColor() {
    const characters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        const pos = Math.floor(Math.random() * characters.length);
        color += characters.substring(pos, pos + 1);
     //   color += characters[pos];
     //   color += characters.charAt(pos);
    }
    return color;
}

const colorList = [];

for (let i = 0; i < 1000; i++) {
    colorList[i] = randomColor();
}

colorList.forEach((color) => {
    const divEle = document.createElement('div');
    divEle.classList.add('color-card');
    divEle.style.background = `#${color}`;

    divEle.innerHTML = `
       <div class="showColorName">
              <span class="colorCode">#${color}</span>
              <button class="copy-btn">
                     <i class="fa-regular fa-clone"></i>
              </button>
       </div>
                    
    `;

    const copyBtn = divEle.querySelector('.copy-btn');
    const colorCode = divEle.querySelector('.colorCode');

    copyBtn.addEventListener('click', () => {
        const textToCopy = colorCode.textContent;

        try {
            navigator.clipboard.writeText(textToCopy);

            const icon = copyBtn.querySelector('i');
            icon.className = 'fa-solid fa-check';

            setTimeout(() => {
                icon.className = 'fa-regular fa-clone';
            }, 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });

    container.append(divEle);
});
