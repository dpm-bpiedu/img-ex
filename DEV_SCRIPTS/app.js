(function imgEnlarge() {

	// Constants
	const hasFigures = document.querySelectorAll('.figure_name');
	const b = document.querySelector("section.page");

	const sortFigures = () => {
		const allFigures = document.querySelectorAll('figure');

		allFigures.forEach((figure, index) => {
			if(figure.querySelector('.figure_name')) {
				let image = figure.querySelector('img');
				handleImage(image);
			} else {
				return;
			}
		});

	};

	const closeFigure = (evt, figureObj) => {
		let image = figureObj.querySelector('img');
		image.remove();
		figureObj.remove();
	}

	const setAttributes = (el, attrs) => {
		Object.keys(attrs).forEach(function (attr) {
			el.setAttribute(attr, attrs[attr]);
		});		
	}


	const createFigure = (imgAttrs) => {

		const figure = document.createElement("figure");
		const image = document.createElement("img");

		figure.setAttribute("class", "figure_enlarged");
		setAttributes(figure, {
			class: 'figure_enlarged',
			tabindex: '0'
		});
		setAttributes(image, imgAttrs);
		figure.addEventListener("click", function(evt){closeFigure(evt, this)}, false);
		figure.addEventListener("keyup", function(evt){closeFigure(evt, this)}, false);

		

		figure.appendChild(image);
		b.appendChild(figure);

		figure.focus();

	}

	const checkEvt = (evt, imgObj) => {
		evt.type === "click" ? handleClick(evt, imgObj) : handleKeyup(evt, imgObj);

		function handleClick(evt, imgObj) {
			eventResponse(evt, imgObj);
			evt.target.removeEventListener("keyup", function(evt) {checkEvt(evt, this)}, false);
		}

		function handleKeyup(evt, imgObj) {
			evt.preventDefault();
			if(evt.keyCode === 9) {
				return;
			} else {
				eventResponse(evt, imgObj);
			}
			evt.target.removeEventListener("keyup", function(evt) {checkEvt(evt, this)}, false);
		}

		function eventResponse(evt, omgObj) {
			let imgAttrs = {
				title: 'click to close image',
				class: 'img_enlarged',
				style: 'cursor: pointer;',
				src: imgObj.getAttribute('src'),
				alt: imgObj.getAttribute('alt')
			}

			createFigure(imgAttrs);

		}

	};

	const handleImage = (imgObj) => {
		setAttributes(imgObj,{
			role: 'button',
			tabindex: '0',
			style: 'cursor: pointer',
			title: 'click to enlarge this image'
		});
	
		imgObj.addEventListener("click", function(evt) {checkEvt(evt, this)}, false);
		imgObj.addEventListener("keyup", function(evt) {checkEvt(evt, this)}, false);
	}

	// Initialize 

	if(hasFigures.length) {
		sortFigures();
	} else {		
		return;
	}



}());

