document.querySelectorAll("[data-toggle='collapse']").forEach((item) => {
  item.classList.add("collapsed");
  item.addEventListener("click", () => {
    const { target } = item.dataset;
    if (target) {
      document.querySelector(target).classList.toggle("collapse--show");
      item.classList.toggle("collapsed");
    }
  });
});