(function imgEnlarge() {

	const handleFigures = () => {
		const allFigures = document.querySelectorAll('figure');

		allFigures.forEach((figure, index) => {
			if(figure.querySelector('.figure_name')) {
				console.log(index, " is art");
			} else {
				console.log(index, " is NOT art");
			}
		});
	};

	const hasFigures = document.querySelectorAll('.figure_name');

	if(hasFigures.length) {
		handleFigures();
	} else {
		console.log('This page does NOT have figures');
		return;
	}






}());

