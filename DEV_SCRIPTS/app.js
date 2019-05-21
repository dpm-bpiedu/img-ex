(function imgEnlarge() {

	// Constants
	const hasFigures = document.querySelectorAll('.figure_name');
	const b = document.querySelector("body");

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

	const closeImage = (evt, imgObj) => {
		const screen = document.querySelector("div.img_screen");
		console.log(evt.target);
		imgObj.remove();
		screen.remove();
	}

	const createFigure = (imgAttrs) => {

		function setAttributes(el, attrs) {
			Object.keys(attrs).forEach(function (attr) {
				el.setAttribute(attr, attrs[attr]);
			});
		}

		const screen = document.createElement("div");
		const image = document.createElement("img");
		screen.setAttribute("class", "img_screen");
		setAttributes(image, imgAttrs);

		image.addEventListener("click", function(evt){closeImage(evt, this)}, false);

		//b.appendChild(screen);
	//	b.appendChild(image);
		b.prepend(screen);
		b.prepend(image);

	}

	const imgEnlarge = (evt, imgObj) => {
		let imgAttrs = {
			title: 'click to close image',
			class: 'img_enlarged',
			style: 'cursor: pointer;'
		};

		imgAttrs.src = imgObj.getAttribute("src");
		imgAttrs.alt = imgObj.getAttribute("alt");

		createFigure(imgAttrs);

	}



	const handleImage = (imgObj) => {
		imgObj.style.cursor = ('pointer');
		imgObj.setAttribute("title", "click to enlarge image");
		imgObj.addEventListener("click", function(evt) {imgEnlarge(evt, this)}, false);
	}




	// Initialize 



	if(hasFigures.length) {
		sortFigures();
	} else {
		console.log('This page does NOT have figures');
		return;
	}






}());

