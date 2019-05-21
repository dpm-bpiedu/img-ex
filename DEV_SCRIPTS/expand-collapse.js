const constellationExpandCollapse = () => {


    var toggleBtns = document.querySelectorAll("[aria-expanded][aria-controls]");
    var isCollapsed, currentString, currentContent, currentToggle, ecString, ecContent, collapseBtn;

    function ecToggle(currentObj) {
        isCollapsed = currentObj.getAttribute("aria-expanded") === "false";
        currentContent = document.getElementById(currentObj.getAttribute("aria-controls"));
        if(isCollapsed) {
            currentObj.setAttribute("aria-expanded", "true");
            currentContent.classList.replace("ec_collapsed", "ec_expanded");
        } else {
            currentObj.setAttribute("aria-expanded", "false");
            currentContent.classList.replace("ec_expanded", "ec_collapsed");
        }
    }

    function ecCollapse(currentObj) {
        currentString = currentObj.getAttribute("name");
        currentToggle = document.querySelector("[aria-controls='" +  currentString + "']");
        currentContent = document.getElementById(currentString);

        currentToggle.setAttribute("aria-expanded", "false");
        currentContent.classList.replace("ec_expanded", "ec_collapsed");

    }

    toggleBtns.forEach(function(btn) {
        ecString = btn.getAttribute("aria-controls");
        ecContent = document.querySelector("#"+ ecString);
        collapseBtn = document.querySelector("[name='" + ecString + "']");

        ecContent.classList.add("ec_collapsed");
        btn.addEventListener("click", function() {ecToggle(this)}, false);
        collapseBtn.addEventListener("click", function() {ecCollapse(this)}, false);

   });       
 

};

export default constellationExpandCollapse;



