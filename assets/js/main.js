/* Elmenet 가져오기 */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* 함수 만들기 */
function togglePlay() {
  //정지 상태면 플레이, 플레이 상태면 정지
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
function updateButton() {
  //재생,일시정지 아이콘을 icon에 저장해서 textContent로 바꿔줌
  const icon = this.paused ? '▶' : '∥';
  toggle.textContent = icon;
}
function skip() {
  //미리 정해둔 data-skip 값으로 비디오 구간 건너뛰기
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  //볼륨, 속도 조절
  video[this.name] = this.value;
}
function handleProgress() {
  //video 구간 위치에 맞게 bar가 칠해짐
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* event 걸기 */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach((button) => button.addEventListener('click', skip));
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate)
);
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //mousedown이 true일 때만 scrub 함수 발동
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
