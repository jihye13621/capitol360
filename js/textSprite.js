getImages = null;
(function() {
	let getRandomText = function() {
		//change into real data here
		return chance
			.n(function() {
				return chance
				
					.n(chance.word, chance.weighted([1, 2, 3], [2, 3, 1]))
					.join(' ');
			}, chance.weighted([1, 2, 3], [2, 3, 1]))
			.join('\n');
	};

	/* get treehouse profile info via JSON */
	// $(document).ready(function() {
	// 	// $.getJSON("https://10ee9d2c.ngrok.io/lookup/sad", function(data) { 
	// 	$.getJSON("js/test.json", function(data) {
	// 		console.log(data);
	// 		let synonymOutPut = data.synonyms;
	// 		console.log(data.synonyms);
	// 		return synonymOutPut;
	// 	});
	// });

	// custom API
	let getSynonyms = function(cb) {
		// setInterval(function() {
		// 	console.log("Once ran");
		// }, 1000);
		$.getJSON("https://10ee9d2c.ngrok.io/lookup/" + inspirationInput, function(data) { 
		// $.getJSON("js/test.json", function(data) {
			// console.log('|' + data.data.synonyms + '|');
			cb(data.data.synonyms);
			return data.data.synonyms;
		});
	}

	let getQuotes = function(cb) {
		$.getJSON("https://10ee9d2c.ngrok.io/lookup/" + inspirationInput, function(data) { 
		// $.getJSON("js/test.json", function(data) {
			// console.log('|' + data.data.quotes + '|');
			cb(data.data.quotes);
			return data.data.quotes;
		});
	}

	let getPoems = function(cb) {
		$.getJSON("https://10ee9d2c.ngrok.io/lookup/" + inspirationInput, function(data) { 
		// $.getJSON("js/test.json", function(data) {
			let poemOutPut = data.data.poems;
			// console.log('|' + data.data.poems + '|');
			cb(data.data.poems);
		});
	}

	function displayPoem(poem) {
		let output = poem.lines.join('\n');
		output += '\n—' + poem.author;
		return output;
	}

	let getRhymes = function(cb) {
		$.getJSON("https://10ee9d2c.ngrok.io/lookup/" + inspirationInput, function(data) { 
		// $.getJSON("js/test.json", function(data) {
			let rhymes = data.data.rhymes.map(x => x.word);
			// console.log('|' + data.data.rhymes + '|');
			cb(rhymes);
		});
	}

	function displayRhymes(rhymes) {
		let output = rhymes.map(x => x.word).join(', ');
		return output;
	}

	getImages = function(cb) {
		$.getJSON("https://10ee9d2c.ngrok.io/lookup/" + inspirationInput, function(data) { 
		// $.getJSON("js/test.json", function(data) {
			console.log('|' + data.data.images.map(img => img.urls.regular) + '|');
			cb(data.data.images.map(img => img.urls.regular));
			return data.data.images.map(img => img.urls.regular);
		});
	}
	

	// API end

	let getRandomFontFamily = function() {
		return chance.pickone([
			'Georgia, serif',
			'"Palatino Linotype", "Book Antiqua", Palatino, serif',
			'"Times New Roman", Times, serif',

			'Arial, Helvetica, sans-serif',
			'"Arial Black", Gadget, sans-serif',
			'Impact, Charcoal, sans-serif',
			'"Lucida Sans Unicode", "Lucida Grande", sans-serif',
			'Tahoma, Geneva, sans-serif',
			'"Trebuchet MS", Helvetica, sans-serif',
			'Verdana, Geneva, sans-serif',

			'"Courier New", Courier, monospace',
			'"Lucida Console", Monaco, monospace',
		]);
	};

	let getRandomColor = function() {
		return chance.color({format: 'hex'});
	};

	let getSoundColor = function() {
		return new THREE.Color("rgb(" + Math.floor(Math.random() * 220 + 35) + ", 0, 0)");
	}

	let getMeaningColor = function() {
		return new THREE.Color("rgb(0, " + Math.floor(Math.random() * 220 + 35) + ", 0)");
	}

	let getPieceColor = function() {
		return new THREE.Color("rgb(0, 0, " + Math.floor(Math.random() * 220 + 35) + ")");
	}

	let run = function() {
		
		let n = 1;
	
		let getRandomTextSize = function() {
			return (1/64 + Math.random()) * n/4;
		};
	
		let renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setClearColor(0x000000);
		document.body.appendChild(renderer.domElement);
	
		// let scene = new THREE.Scene();
	
		let camera = new THREE.PerspectiveCamera(75, 1, n/128, 128*n);
		camera.position.set(0, 0, 8*n);
	
		let redrawInterval = 1;
		let autoRedraw = true;
	
		// let sprites = Array.from({length: 88}, function() {
		// 	let sprite = new THREE.TextSprite({
		// 		textSize: getRandomTextSize(),
		// 		redrawInterval: redrawInterval,
		// 		material: {
		// 			color: getRandomColor(),
		// 		},
		// 		texture: {
		// 			text: getRandomText(),
		// 			fontFamily: getRandomFontFamily(),
		// 			autoRedraw: autoRedraw,
		// 		},
		// 	});
		// 	sprite.position
		// 		.setX(Math.random())
		// 		.setY(Math.random())
		// 		.setZ(Math.random())
		// 		.subScalar(1/2)
		// 		.setLength(1 + Math.random())
		// 		.multiplyScalar(3*n);
		// 	scene.add(sprite);
		// 	return sprite;
		// });
	
		let spritesSynonyms = Array.from({length: 60}, function() {		// TODO: Add length constant
			getSynonyms(function(synonyms) {
				// console.log('|' + getRandomText() + '|');
				// console.log('|' + synonyms + '|');
				let index = Math.floor(Math.random() * synonyms.length);
				let spriteSynonyms = new THREE.TextSprite({
					textSize: getRandomTextSize(),
					redrawInterval: redrawInterval,
					material: {
						color: getMeaningColor(),
					},
					texture: {
						text: synonyms[index],
						fontFamily: getRandomFontFamily(),
						autoRedraw: autoRedraw,
					},
				});
				spriteSynonyms.position
					.setX(Math.random())
					.setY(Math.random())
					.setZ(Math.random())
					.subScalar(1/2)
					.setLength(1 + Math.random())
					.multiplyScalar(3*n);
				scene.add(spriteSynonyms);
				return spriteSynonyms;
			});
		});
	
		let spritesQuotes = Array.from({length: 10}, function() {		// TODO: Add length constant
			getQuotes(function(quotes) {
				// console.log('|' + getRandomText() + '|');
				// console.log('|' + quotes + '|');
				let index = Math.floor(Math.random() * quotes.length);
				let spriteQuotes = new THREE.TextSprite({
					textSize: getRandomTextSize(),
					redrawInterval: redrawInterval,
					material: {
						color: getPieceColor(),
					},
					texture: {
						text: quotes[index],
						fontFamily: getRandomFontFamily(),
						autoRedraw: autoRedraw,
					},
				});
				spriteQuotes.position
					.setX(Math.random())
					.setY(Math.random())
					.setZ(Math.random())
					.subScalar(1/2)
					.setLength(1 + Math.random())
					.multiplyScalar(3*n);
				scene.add(spriteQuotes);
				return spriteQuotes;
			});
		});
	
		let spritesPoem = Array.from({length: 3}, function() {
			getPoems(function(poems) {
				// console.log('|' + getRandomText() + '|');
				// console.log('|' + poems + '|');
				// console.log("Number", n);
				let spritePoem = new THREE.TextSprite({
					textSize: 1/16,
					redrawInterval: redrawInterval,
					material: {
						color: getPieceColor(),
					},
					texture: {
						text: displayPoem(poems[Math.floor(Math.random() * poems.length)]),
						fontFamily: getRandomFontFamily(),
						autoRedraw: autoRedraw,
					},
				});
				spritePoem.position
					.setX(Math.random())
					.setY(Math.random())
					.setZ(Math.random())
					.subScalar(1/2)
					.setLength(1 + Math.random())
					.multiplyScalar(3*n);
				scene.add(spritePoem);
				return spritePoem;
			});
		});
	
		let spritesRhymes = Array.from({length: 10}, function() {		// TODO: Add length constant
			getRhymes(function(rhymes) {
				// console.log('|' + getRandomText() + '|');
				// console.log('|' + JSON.stringify(rhymes, null, '\t') + '|');
				let index = Math.floor(Math.sqrt(Math.random() * rhymes.length));
				let spriteRhymes = new THREE.TextSprite({
					textSize: 1/8,
					redrawInterval: redrawInterval,
					material: {
						color: getSoundColor(),
					},
					texture: {
						text: rhymes[index],
						fontFamily: getRandomFontFamily(),
						autoRedraw: autoRedraw,
					},
				});
				spriteRhymes.position
					.setX(Math.random())
					.setY(Math.random())
					.setZ(Math.random())
					.subScalar(1/2)
					.setLength(1 + Math.random())
					.multiplyScalar(3*n);
				scene.add(spriteRhymes);
				return spriteRhymes;
			});
		});
	
	
		
	
		let controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.maxDistance = camera.far/2;
		controls.enableDamping = true;
		controls.dampingFactor = 1/8;
		controls.rotateSpeed = 1/4;
		controls.zoomSpeed = 1;
		controls.keyPanSpeed = 1/2;
	
		// let renderScene = function() {
		// 	renderer.setSize(document.body.offsetWidth, document.body.offsetHeight);
		// 	camera.aspect = renderer.domElement.width / renderer.domElement.height;
		// 	camera.updateProjectionMatrix();
		// 	controls.update();
		// 	renderer.render(scene, camera);
		// };
	
		// window.addEventListener('resize', renderScene, false);
	
		// let startToRenderScene = function() {
		// 	setTimeout(function() {
		// 		requestAnimationFrame(startToRenderScene);
		// 	}, 1000/60);
		// 	renderScene();
		// };
		// startToRenderScene();
	
		let gui = new dat.GUI();
		(function() {
			let guiFolder = gui.addFolder('texture');
			guiFolder.add({
				text: function() {
					sprites.forEach(function(sprite) {
						sprite.material.map.text = getRandomText();
					});
				},
			}, 'text');
			guiFolder.add({
				fontFamily: function() {
					sprites.forEach(function(sprite) {
						sprite.material.map.fontFamily = getRandomFontFamily();
					});
				},
			}, 'fontFamily');
			guiFolder.add(Object.defineProperty({}, 'autoRedraw', {
				get: function() {
					return autoRedraw;
				},
	
				set: function(value) {
					autoRedraw = value;
					sprites.forEach(function(sprite) {
						sprite.material.map.autoRedraw = autoRedraw;
					});
				},
			}), 'autoRedraw');
			guiFolder.open();
		})();
		(function() {
			let guiFolder = gui.addFolder('sprite');
			guiFolder.add({
				textSize: function() {
					sprites.forEach(function(sprite) {
						sprite.textSize = getRandomTextSize();
					});
				},
			}, 'textSize');
			guiFolder.add(Object.defineProperty({}, 'redrawInterval', {
				get: function() {
					return redrawInterval;
				},
	
				set: function(value) {
					redrawInterval = value;
					sprites.forEach(function(sprite) {
						sprite.redrawInterval = redrawInterval;
					});
				},
			}), 'redrawInterval', 0, 2000, 1);
			guiFolder.open();
		})();
	}

	let waitForRun = () => {
		if (inspirationInput !== null) {
			console.log("Running");
			run();
		} else {
			console.log("Waiting");
			setTimeout(waitForRun, 100);
		}
	}

	waitForRun();
})();