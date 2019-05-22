const constellationImgEnlarge = () => {
  
  /**
   * CONSTANTS
   * hasFigures used in intialization. If false, returns
   * section is main page element; enlarged image appended to it
   */
  const featuresArray = [...document.querySelectorAll('.figure_name')];
  const hasFeature = featuresArray.length > 0;
  const section = document.querySelector("section.page");

  /**
   * UTILITY FUNCTIONS
   * set multiple elements on an object
   * create DOM element and assign attributes to it.
   */

  const setAttributes = (el, attrs) => {
    let keysArray = Object.keys(attrs);
    for(var i = 0; i < keysArray.length; i++) {
      el.setAttribute(keysArray[i], attrs[keysArray[i]]);
    }
  };

  const createElem = (el, attrs) => {
    let elem = document.createElement(el);
    setAttributes(elem, attrs);
    return elem;
  };

  /**
   * APPLICATION LOGIC
   * Seperate "figure" images from "photo" images
   * Change title attribute of figures to "click to enlarge image"
   * On click/keyboard evt, capture image attributes: src, alt,
   * and set title attribute.
   * 
   * With captured attributes, create new figure and append to DOM,
   * Use css to place figure on top of window. 
   * Add click/keyboard events to remove from DOM when user closes.
   */

  const sortFigures = () => {

    const allFigures = [...document.querySelectorAll("figure")];

    for(var i = 0;i < allFigures.length; i++) {
      let currentFigure = allFigures[i];
      let isFigure = currentFigure.querySelector('.figure_name') != undefined;

      if(isFigure) {
        let currentImage = currentFigure.querySelector('img');
        console.log(currentImage);
        handleImage(currentImage);
      } 
      
    }

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

  const createFigure = imgAttrs => {

    const figure = createElem('figure', {
      'class': 'figure_enlarged', 
      'tabindex': '0'
    });

    const image = createElem('img', imgAttrs);

    figure.addEventListener("click", function(evt) {closeFigure(evt, this);}, false);
    figure.addEventListener("keyup", function(evt) {closeFigure(evt, this);}, false);

    figure.appendChild(image);
    section.appendChild(figure);

    figure.focus();

  };

  const handleEvt = (evt, imgObj) => {
    evt.type === "click" ? handleClick(evt, imgObj) : handleKeyup(evt, imgObj);

    function handleClick(evt, imgObj) {
      evtReaction(imgObj);
      evt.target.removeEventListener("keyup", function(evt) {handleEvt(evt, this);},false);
    }

    function handleKeyup(evt, imgObj) {
      evt.preventDefault();
      if (evt.keyCode === 9) {
        return;
      } else {
        evtReaction(imgObj);
      }
      evt.target.removeEventListener("keyup",function(evt) {handleEvt(evt, this);},false);
    }

    function evtReaction(imgObj) {
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

  const closeFigure = (evt, figureObj) => {
    let image = figureObj.querySelector("img");
    image.remove();
    figureObj.remove();
  };


 /**
   * INITIALIZE
   */

  if (hasFeature) {
    sortFigures();
  } else {
    return;
  }

};

export default constellationImgEnlarge;
