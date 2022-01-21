

const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', e => {
    anime(box, {
        prop: "margin-top",
        value: 300,

        callback: () => {
            anime(box, {
                prop: "margin-left",
                value: 1000,

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
    //현재값과 변경할값이 같으면 동작 중지
    if (currentValue === option.value) {
        return;
    }
    //현재값과 변경할값이 같지않으면 run함수 실행
    requestAnimationFrame(run);

    function run(time) {
        let timelast = time - startTime;
        let progress = timelast / option.duration;

        if (progress < 0) {
            progress = 0;
        }

        if (progress < 1) {
            requestAnimationFrame(run);
        } else {
            if (option.callback) {
                option.callback();
            }
        }

        //현재 수치값에서 앞으로 변화가 되야하는 수치값만 progress연산처리 해줌
        const result = currentValue + ((option.value - currentValue) * progress);
        selector.style[option.prop] = `${result}px`
    }

}


/*
  requestAnimationFrame의 콜백함수 인수로 전달되는 값
  - 해당 콜백함수가 반복 호출될때마다의 누적시간

  진행률(백분율)
  (현재진행수치 / 전체수치 ) * 100
  */

