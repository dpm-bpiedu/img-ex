(function imgEnlarge() {

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

	const imgEnlarge = (evt, imgObj) => {
		let imgAttrs = {
			title: 'click to close image',
			class: 'img_enlarged'
		};

		imgAttrs.src = imgObj.getAttribute("src");
		imgAttrs.alt = imgObj.getAttribute("alt");

		console.log(imgAttrs);

	}

	const handleImage = (imgObj) => {
		imgObj.style.cursor = ('pointer');
		imgObj.setAttribute("title", "click to enlarge image");
		imgObj.addEventListener("click", function(evt) {imgEnlarge(evt, this)}, false);
	}




	// Initialize 

	const hasFigures = document.querySelectorAll('.figure_name');

	if(hasFigures.length) {
		sortFigures();
	} else {
		console.log('This page does NOT have figures');
		return;
	}






}());

