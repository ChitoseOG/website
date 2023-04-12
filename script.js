let slideIndex = 0;
const slideshowImages = document.getElementsByClassName("slideshow-image");

// スライドを切り替える関数
function changeSlide(n) {
  slideIndex += n;
  if (slideIndex < 0) {
    slideIndex = slideshowImages.length - 1;
  } else if (slideIndex >= slideshowImages.length) {
    slideIndex = 0;
  }
  for (let i = 0; i < slideshowImages.length; i++) {
    slideshowImages[i].classList.remove("active");
  }
  slideshowImages[slideIndex].classList.add("active");
}

// 5秒ごとにスライドを自動的に切り替える
setInterval(() => changeSlide(1), 5000);
