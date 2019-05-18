const bonus = [
    { id: 0, name: '奖品0' },
    { id: 1, name: '奖品1' },
    { id: 2, name: '奖品2' },
    { id: 3, name: '奖品3' },
    { id: 4, name: '奖品4' },
    { id: 5, name: '奖品5' },
    { id: 6, name: '奖品6' },
];

const count = 6; // 默认要转的圈数

const $turntable = document.querySelector(".turntable");
const $pointer = document.querySelector(".pointer");
let result;
let canClick = true;

$pointer.addEventListener('click', () => {
    if (!canClick) return;

    result = Math.floor(Math.random() * 7);
    console.log(result);

    const startDegree = getCurrentRotation($turntable);
    const endDegree = count * 360 + result * 52 - 27;

    canClick = false;
    createSpinKeyframe(startDegree, endDegree);
    $turntable.classList.add('spin');
});

$turntable.addEventListener('animationend', () => {
    const endDegree = getCurrentRotation($turntable);

    $turntable.style.transform = `rotate(${endDegree}deg)`;
    $turntable.classList.remove('spin');
    canClick = true;

    alert(`恭喜你获得了${bonus[result].name}`);
});

function createSpinKeyframe(startDegree, endDegree) {
    const id = 'spin-keyframes';
    let sheet = document.querySelector(`#${id}`);

    if (!sheet) {
        sheet = document.createElement('style');
        sheet.type = 'text/css';
        sheet.id = id;

        document.querySelector('head').appendChild(sheet);
    } 

    sheet.innerHTML = `
        @keyframes spin {
            0% {
                transform: rotate(${startDegree}deg);
            }
        
            100% {
                transform: rotate(${endDegree}deg);
            }
        }
    `;
}

function getCurrentRotation($el) {
    const st = window.getComputedStyle($el, null);
    const tr = st.getPropertyValue("transform");
    let angle = 0;
  
    if( tr !== "none") {
        let values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        const a = values[0];
        const b = values[1];
  
        const radians = Math.atan2(b, a);
        angle = Math.round( radians * (180/Math.PI));
    }
  
    return angle;
  }