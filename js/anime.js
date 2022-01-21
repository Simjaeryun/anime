const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', e => {
    anime(box, {
        prop: 'opacity',
        value: 0,
        duration: 2000
    });
})


function anime(selector, option) {
    const startTime = performance.now();
    if (!option.duration) option.duration = 500;

    let currentValue = parseFloat(getComputedStyle(selector)[option.prop]);
    let isString = typeof option.value;

    if (isString === 'string') {
        const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
        const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];
        const parentW = parseInt(getComputedStyle(selector.parentElement).width);
        const parentH = parseInt(getComputedStyle(selector.parentElement).height);

        for (let condition of x) if (option.prop === condition) currentValue = (currentValue / parentW) * 100;
        for (let condition of y) if (option.prop === condition) currentValue = (currentValue / parentH) * 100;

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

        if (isString === 'string') selector.style[option.prop] = `${result}%`;
        else if (option.prop === "opacity") selector.style[option.prop] = result;
        else selector.style[option.prop] = `${result}px`;
    }
}
