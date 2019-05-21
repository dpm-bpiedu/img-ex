const constellationImgEnlarge = () => {
  /**
   * CONSTANTS
   */

  const hasFigures = document.querySelectorAll(".figure_name").length > 0;
  const section = document.querySelector("section.page");

  /**
   * UTILITY FUNCTIONS
   */

  const setAttributes = (el, attrs) => {
    Object.keys(attrs).forEach(function(attr) {
      el.setAttribute(attr, attrs[attr]);
    });
  };

  const createElem = (el, attrs) => {
    let elem = document.createElement(el);
    elem.setAttributes(el, attrs);
    return elem;
  };

  /**
   * App logic
   */

  const sortFigures = () => {
    const allFigures = document.querySelectorAll("figure");

    allFigures.forEach((figure, index) => {
      if (figure.querySelector(".figure_name")) {
        let image = figure.querySelector("img");
        handleImage(image);
      } else {
        return;
      }
    });
  };

  const handleImage = imgObj => {
    setAttributes(imgObj, {
      role: "button",
      tabindex: "0",
      style: "cursor: pointer",
      title: "click to enlarge this image"
    });

    imgObj.addEventListener("click", function(evt) {handleEvt(evt, this);},false);
    imgObj.addEventListener("keyup", function(evt) {handleEvt(evt, this);}, false);
  };

  const closeFigure = (evt, figureObj) => {
    let image = figureObj.querySelector("img");
    image.remove();
    figureObj.remove();
  };

  const createFigure = imgAttrs => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");

    figure.setAttribute("class", "figure_enlarged");
    setAttributes(figure, {
      class: "figure_enlarged",
      tabindex: "0"
    });
    setAttributes(image, imgAttrs);
    figure.addEventListener("click", function(evt) {closeFigure(evt, this);}, false);
    figure.addEventListener("keyup", function(evt) {closeFigure(evt, this);}, false);

    figure.appendChild(image);
    section.appendChild(figure);

    figure.focus();
    
  };

  const handleEvt = (evt, imgObj) => {
    evt.type === "click" ? handleClick(evt, imgObj) : handleKeyup(evt, imgObj);

    function handleClick(evt, imgObj) {
      evtReaction(evt, imgObj);
      evt.target.removeEventListener("keyup", function(evt) {handleEvt(evt, this);},false);
    }

    function handleKeyup(evt, imgObj) {
      evt.preventDefault();
      if (evt.keyCode === 9) {
        return;
      } else {
        evtReaction(evt, imgObj);
      }
      evt.target.removeEventListener("keyup",function(evt) {checkEvt(evt, this);},false);
    }

    function evtReaction(evt, omgObj) {
      let imgAttrs = {
        title: "click to close image",
        class: "img_enlarged",
        style: "cursor: pointer;",
        src: imgObj.getAttribute("src"),
        alt: imgObj.getAttribute("alt")
      };

      createFigure(imgAttrs);
    }
  };

 /**
   * Initialize
   */

  if (hasFigures) {
    sortFigures();
  } else {
    return;
  }
};

export default constellationImgEnlarge;
