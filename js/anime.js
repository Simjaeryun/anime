const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', e => {
    anime(box, {
        prop: 'left',
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
        //부모요소의 가로폭을 기준으로 백분율 변환해야하는 모든속성을 배열에담아
        //해당 배열의 개수만큼 반복을 돌면서 조건문처리 
        const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
        //부모요소의 세로폭을 기준으로 백분율 변환해야하는 모든속성을 배열에담아
        //해당 배열의 개수만큼 반복을 돌면서 조건문처리 
        const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];

        for (let condition of x) {
            if (option.prop === condition) {
                const parentW = parseInt(getComputedStyle(selector.parentElement).width);
                currentValue = (currentValue / parentW) * 100;
            }
        }
        for (let condition of y) {
            if (option.prop === condition) {
                const parentH = parseInt(getComputedStyle(selector.parentElement).height);
                currentValue = (currentValue / parentH) * 100;
            }
        }


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
