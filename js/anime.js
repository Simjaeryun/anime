

const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', e => {
    anime(box, {
        prop: "margin-top",
        value: 500,

        callback: () => {
            anime(box, {
                prop: "margin-left",
                value: 500,

            })
        }
    });
})


function anime(selector, option) {
    startTime = performance.now();
    if (!option.duration) {
        option.duration = 500;
    }

    //현재 선택자의 걸려있는 속성값을 구해야함
    const currentValue = parseInt(getComputedStyle(selector)[option.prop])
    console.log(currentValue);
    if (currentValue === option.value) {
        return;
    }
    if (currentValue < option.value) {
        requestAnimationFrame(plus);
    }
    if (currentValue > option.value) {
        requestAnimationFrame(minus)
    }

    function plus(time) {
        let timelast = time - startTime;
        let progress = timelast / option.duration;

        if (progress < 0) {
            progress = 0;
        }

        if (progress < 1) {
            requestAnimationFrame(plus);
        } else {
            if (option.callback) {
                option.callback();
            }
        }

        //현재 수치값에서 앞으로 변화가 되야하는 수치값만 progress연산처리 해줌
        const result = currentValue + ((option.value - currentValue) * progress);
        selector.style[option.prop] = `${result}px`
    }


    function minus(time) {
        let timelast = time - startTime;
        let progress = timelast / option.duration;

        if (progress < 0) {
            progress = 0;
        }

        if (progress < 1) {
            requestAnimationFrame(minus);
        } else {
            if (option.callback) {
                option.callback();
            }
        }
        const result =
            selector.style[option.prop] = `${option.value * progress}px`
    }

}


/*
  requestAnimationFrame의 콜백함수 인수로 전달되는 값
  - 해당 콜백함수가 반복 호출될때마다의 누적시간

  진행률(백분율)
  (현재진행수치 / 전체수치 ) * 100
  */

