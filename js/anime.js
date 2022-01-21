

const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', e => {
    anime(box, {
        prop: "margin-top",
        value: 500,
        duration: 1500
    });
})


function anime(selector, option) {
    startTime = performance.now();
    requestAnimationFrame(move);
    function move(time) {
        let timelast = time - startTime;
        let progress = timelast / option.duration;

        if (progress < 0) {
            progress = 0;
        }

        if (progress < 1) {
            requestAnimationFrame(move);
            selector.style[option.prop] = `${option.value * progress}px`
        }
    }

}


/*
  requestAnimationFrame의 콜백함수 인수로 전달되는 값
  - 해당 콜백함수가 반복 호출될때마다의 누적시간

  진행률(백분율)
  (현재진행수치 / 전체수치 ) * 100
  */

