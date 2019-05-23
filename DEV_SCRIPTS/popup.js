const constellationTipBox = () => {

    ////////////////////////////////////////////////////////////////////
    //// CONSTANTS /////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////	

    const tipFeatureNL = document.querySelectorAll("[class^=tipBox]");
    const tipFeatureArray = Array.prototype.slice.call(tipFeatureNL);
    const hasFeature = tipFeatureArray.length > 0;

    ////////////////////////////////////////////////////////////////////
    //// UTILITY FUNCTIONS /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////	
  
    // set multiple attributes for an element
    function setAttributes (el, attrs) {
      let keysArray = Object.keys(attrs);
      for(var i = 0; i < keysArray.length; i++) {
        el.setAttribute(keysArray[i], attrs[keysArray[i]]);
      }
    }
  
    // create a button element
    function makeBtn(btnClass, btnText, fn) {
      let button = document.createElement("button");
      let text = document.createTextNode(btnText);
      button.appendChild(text);
      setAttributes(button, {
        "type": "button",
        "aria-label": "Close",
        "class": btnClass
      });
      button.addEventListener("click", fn);
      return button;
    }	
  
    ////////////////////////////////////////////////////////////////////
    //// PAGE OBJECT ///////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
  
    const page = {
      boxes: document.querySelectorAll("[class^=tipBox]"),
      manageScreen: function (status) {
        if (status === "open") {
          const screenStyles = "position: fixed; top: 0; left: 0; right: 0; height: 100%; z-index: 4599; background-color: black; opacity: .65;";
          this.body = document.querySelector("body");
          this.screen = document.createElement("div");
          setAttributes(this.screen, {
            "style": screenStyles,
            "id": "tipBox_screen"
          });
          this.body.insertBefore(this.screen, this.body.firstChild);
          document.getElementsByTagName("html")[0].setAttribute("style", "overflow: hidden;");
        } else if (status === "close") {
          this.screen = document.getElementById("tipBox_screen");
          this.screen.remove();
          document.getElementsByTagName("html")[0].removeAttribute("style");
        }
      },
      setENV: function () {
        if (document.querySelector("span.werd") === null) {
          this.envIndex = 0;
        } else {
          this.envIndex = 1;
        }
      },
      setBoxes: function () {
        let boxesArray = Array.prototype.slice.call(this.boxes);

        for(var i = 0; i <boxesArray.length; i++) {
          let currentBox = boxesArray[i];
          box.setBox(currentBox);
        }

      },
      setEsc: function () {
        document.addEventListener("keydown", function (event) {
          if (event.keyCode === 27) {
            box.closeBox();
          }
        });
      },
      manageFocus: function (action) {
        if (action === "open") {
          box.obj.focus();
          document.addEventListener("keydown", function (event) {
            const focusableItems = box.obj.querySelectorAll("a, button, iframe, [tabindex]");
            let firstTab = focusableItems[0];
            let lastTab = focusableItems[focusableItems.length - 1];
            let isTabPressed = (event.key === 'Tab' || event.keyCode === 9);
            let escIsPressed = (event.key === 'escape' || event.keyCode === 27);
            if (!isTabPressed && !escIsPressed) {
              return;
            }
            if (event.shiftKey) {
              if (document.activeElement === firstTab) {
                lastTab.focus();
                event.preventDefault();
              }
            } else if (isTabPressed) {
              if (document.activeElement === lastTab) {
                firstTab.focus();
                event.preventDefault();
              }
            }
          });
        } else if (action === "close") {
          trigger.obj.focus();
        } else {
          return;
        }
  
      },
      setPage: function () {
        this.setENV();
        this.setBoxes();
        this.setEsc();
      }
    };
  
    ////////////////////////////////////////////////////////////////////
    //// BOX OBJECT ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
  
    const box = {
      setBox: function (boxObject) {
        this.content = boxObject.children[page.envIndex];
        this.label = box.content.children[page.envIndex];
        this.content.setAttribute("role", "document");
        this.label.setAttribute("id", `${boxObject.id}`);
        this.labelText = this.label.textContent;
        setAttributes(boxObject, {
          "aria-hidden": "true",
          "role": "dialog",
          "tabindex": 0,
          "aria-labelledby": `${boxObject.id}-label`
        });
        trigger.obj = document.querySelector(`[href$=${boxObject.id}]`);
        trigger.setTrigger(this.labelText, boxObject.id);
      },
      addBtns: function () {
        box.content.insertBefore(makeBtn("btn-close-top", "x", this.closeBox), box.content.firstChild);
        box.content.appendChild(makeBtn("btn-close-bottom", "close", this.closeBox));
      },
      removeBtns: function () {
        let btn1 = box.obj.querySelector(".btn-close-top");
        let btn2 = box.obj.querySelector(".btn-close-bottom");
        btn1.remove();
        btn2.remove();
      },
      openBox: function (activeRef) {
        trigger.obj = document.querySelector(`[aria-controls=${activeRef}]`);
        this.obj = document.getElementById(activeRef);
        this.content = this.obj.children[page.envIndex];
        this.labelText = this.content.children[page.envIndex].textContent;
        page.manageScreen("open");
        this.addBtns();
        this.obj.setAttribute("aria-hidden", "false");
        this.obj.addEventListener("dblclick", this.closeBox);
        this.content.addEventListener("dblclick", function (event) {
          event.stopPropagation();
        });
        page.manageFocus("open");
      },
      closeBox: function () {
        box.obj.setAttribute("aria-hidden", "true");
        box.removeBtns();
        page.manageScreen("close");
        page.manageFocus("close");			
      }
    };
  
    ////////////////////////////////////////////////////////////////////
    //// TRIGGER OBJECT ////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
  
    const trigger = {
      setTrigger: function (title, boxId) {
        setAttributes(this.obj, {
          "aria-controls": boxId,
          "title": `Click to open ${title}`
        });
        this.obj.addEventListener("click", function (event) {
          event.preventDefault();
          page.activeRef = this.href.slice(this.href.indexOf("#") + 1);
          box.openBox(page.activeRef);
        });
  
      }
  
    };
  
    ////////////////////////////////////////////////////////////////////
    //// INITIALIZE ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////


    if(hasFeature) {
      page.setPage();
    } else {
      return;
    } 
 
};

export default constellationTipBox;




