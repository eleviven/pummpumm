const DIRECTIONS = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const initialState = {
  lastX: 0,
  currentX: 0,
  direction: null,
  diff: null,
};

class Carousel {
  constructor(target, options) {
    this.defaultOptions = {
      items: 2,
    };
    this.options = { ...this.defaultOptions, options };
    this.parent = target;
    this.slides = [...this.parent.children];

    this.init();
  }
  setState(newState) {
    const prevState = this.state;
    this.state = {
      ...prevState,
      ...newState,
    };
  }
  init() {
    this.state = { ...initialState };
    this.parentWidth = this.parent.offsetWidth;
    this.totalSlide = this.slides.length;
    this.displaySlideCount = this.options.items;
    this.displaySlideWidth = this.parentWidth / this.options.items;
    this.track;
    this.trackWidth = this.displaySlideWidth * this.totalSlide;
    this.state = { ...initialState };

    this.parent.style.overflow = "hidden";
    this.parent.innerHTML = "";

    this.createTrack();

    this.parent.addEventListener("mousedown", this.onDragStart);
    this.parent.addEventListener("mouseup", this.onDragEnd);
    this.parent.addEventListener("mouseleave", this.onDragEnd);
    (() => {
      let timeout;
      window.addEventListener("resize", () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.init();
        }, 200);
      });
    })();
  }
  createTrack() {
    const track = document.createElement("div");
    track.style.position = "relative";
    track.style.width = `${this.trackWidth}px`;
    track.style.transform = `translateX(0px)`;

    this.slides.forEach((slide) => {
      slide.style.width = `${this.displaySlideWidth}px`;
      slide.style.float = "left";
      slide.setAttribute("draggable", "false");
      slide.querySelector("*").setAttribute("draggable", "false");
      track.append(slide);
    });

    this.parent.append(track);
    this.track = track;
  }
  getTransform(target) {
    var { transform } = getComputedStyle(target);
    var matrix = new WebKitCSSMatrix(transform);
    return { x: matrix.m41 };
  }
  // Drag Handlers
  onDragStart = () => {
    this.track.style.transition = "";
    this.parent.addEventListener("mousemove", this.onDrag);
  };
  onDragEnd = () => {
    const { x } = this.getTransform(this.track);
    const { diff, direction, lastX } = this.state;

    let translateX = x;

    this.track.style.transition = "transform 0.3s ease";
    if (diff > 40) {
      if (direction === DIRECTIONS.LEFT) {
        translateX = lastX - this.displaySlideWidth;
      } else if (direction === DIRECTIONS.RIGHT) {
        translateX = lastX + this.displaySlideWidth;
      }
    } else {
      translateX = lastX;
    }
    this.track.style.pointerEvents = "";
    this.track.style.transform = `translateX(${translateX}px)`;

    this.setState({
      lastX: translateX,
      currentX: 0,
      direction: null,
    });

    this.parent.removeEventListener("mousemove", this.onDrag);
  };
  onDrag = ({ movementX }) => {
    const { lastX, currentX } = this.state;
    const { x } = this.getTransform(this.track);
    let translateX = x + movementX;

    this.setState({
      direction: lastX > currentX ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT,
      diff: Math.abs(lastX - currentX),
    });

    if (translateX > 0 || this.displaySlideCount >= this.totalSlide) {
      translateX = 0;
    }
    if (translateX < -this.parentWidth) {
      translateX = -this.parentWidth;
    }

    this.setState({
      currentX: translateX,
    });

    this.track.style.pointerEvents = "none";
    this.track.style.transform = `translateX(${translateX}px)`;
  };
}

function createCarousel(target, options) {
  document.querySelectorAll(target).forEach((carousel) => {
    new Carousel(carousel, options);
  });
}
