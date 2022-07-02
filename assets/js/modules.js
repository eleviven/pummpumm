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

document.querySelectorAll("[data-toggle='tab']").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll("[data-toggle='tab']").forEach((i) => {
      const { target, activeClass } = i.dataset;
      i.classList.remove(activeClass || "active");
      if (document.querySelector(target)) {
        document.querySelector(target).classList.remove("tab__pane--active");
      }
    });

    const { target, activeClass } = item.dataset;
    const targetItem = document.querySelector(target);
    item.classList.add(activeClass || "active");
    if (targetItem) {
      targetItem.classList.add("tab__pane--active");
    }
  });
});
