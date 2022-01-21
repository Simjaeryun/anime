const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', e => {
    anime(box, {
        prop: 'margin-left',
        value: '10%',
        duration: 2000
    });
})


function anime(selector, option) {
    const startTime = performance.now();
    if (!option.duration) option.duration = 500;

    let currentValue = parseInt(getComputedStyle(selector)[option.prop]);

    //속성값이 문자열이면  %처리를 하기 위해 option.value값을 실수로 보정
    let isString = typeof option.value;
    if (isString === 'string') {
        //px단위로 연산된 currentValue값을 다시 백분율로 변환처리
        const winW = window.innerWidth;
        currentValue = (currentValue / winW) * 100;
        option.value = parseFloat(option.value);
    }


    if (currentValue === option.value) return;
    requestAnimationFrame(run);

    function run(time) {
        let timelast = time - startTime;
        let progress = timelast / option.duration;

        if (progress < 0) progress = 0;
        if (progress < 1) {
            requestAnimationFrame(run);
        } else {
            if (option.callback) option.callback();
        }

        const result = currentValue + ((option.value - currentValue) * progress);

        //만약 isString값이 문자면 %적용
        //그렇지 않으면 px적용
        if (isString === 'string') {
            selector.style[option.prop] = `${result}%`;
        } else {
            selector.style[option.prop] = `${result}px`;
        }

    }
}
