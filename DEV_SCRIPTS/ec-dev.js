(function constellationExpandCollapse() {

    const toggleBtnsNL = document.querySelectorAll("[aria-expanded][aria-controls]");
    const toggleBtnsArray = Array.prototype.slice.call(toggleBtnsNL);
    const hasFeature = toggleBtnsArray.length > 0;
    let isCollapsed, currentString, currentContent, currentToggle, ecString, ecContent, collapseBtn;

    function ecToggle(currentObj) {
        isCollapsed = currentObj.getAttribute("aria-expanded") === "false";
        currentContent = document.getElementById(currentObj.getAttribute("aria-controls"));
        if(isCollapsed) {
            currentObj.setAttribute("aria-expanded", "true");
            currentContent.classList.remove("ec_collapsed");
            currentContent.classList.add("ec_expanded");
        } else {
            currentObj.setAttribute("aria-expanded", "false");
            currentContent.classList.remove("ec_expanded");
            currentContent.classList.add("ec_collapsed");
        }
    }

    function ecCollapse(currentObj) {
        currentString = currentObj.getAttribute("name");
        currentToggle = document.querySelector("[aria-controls='" +  currentString + "']");
        currentContent = document.getElementById(currentString);

        currentToggle.setAttribute("aria-expanded", "false");
        currentContent.classList.remove("ec_expanded");
        currentContent.classList.add("ec_collapsed");

    }

    function initFeature() {

        for(var i = 0; i < toggleBtnsArray.length; i++) {
            let btn = toggleBtnsArray[i];
            ecString = btn.getAttribute("aria-controls");
            ecContent = document.querySelector("#"+ ecString);
            collapseBtn = document.querySelector("[name='" + ecString + "']");
    
            ecContent.classList.add("ec_collapsed");
            btn.addEventListener("click", function() {ecToggle(this)});
            collapseBtn.addEventListener("click", function() {ecCollapse(this)});            
        }

    }

    if(hasFeature) {
        initFeature();
    } else {
        return;
    }
  
}());





