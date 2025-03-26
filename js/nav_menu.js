// 页面滚动时显示网页阅读进度
window.onscroll = showProgress; // 执行函数

// 计算并显示阅读进度百分比
function showProgress() {
  let scrollPosition = window.scrollY || document.documentElement.scrollTop, // 获取滚动高度
    documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    ) - document.documentElement.clientHeight, // 网页总高度减去可视区域高度
    progress = Math.round((scrollPosition / documentHeight) * 100), // 计算进度百分比
    btn = document.querySelector("#percent"); // 获取显示进度的元素

  // 确保进度百分比不会超过 99%
  progress = Math.min(progress, 99);
  btn.innerHTML = progress + '%'; // 更新进度显示
}

// 设置页面标题
document.getElementById("page-name").innerText = document.title.split(" | 有木兮丶")[0];
