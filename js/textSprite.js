(function() {

	var getRandomText = function() {
        //change into real data here
		return chance
			.n(function() {
				return chance
					.n(chance.word, chance.weighted([1, 2, 3], [2, 3, 1]))
					.join(' ');
			}, chance.weighted([1, 2, 3], [2, 3, 1]))
			.join('\n');
	};

	var getRandomFontFamily = function() {
		return chance.pickone([
			'Georgia, serif',
			'"Palatino Linotype", "Book Antiqua", Palatino, serif',
			'"Times New Roman", Times, serif',

			'Arial, Helvetica, sans-serif',
			'"Arial Black", Gadget, sans-serif',
			'"Comic Sans MS", cursive, sans-serif',
			'Impact, Charcoal, sans-serif',
			'"Lucida Sans Unicode", "Lucida Grande", sans-serif',
			'Tahoma, Geneva, sans-serif',
			'"Trebuchet MS", Helvetica, sans-serif',
			'Verdana, Geneva, sans-serif',

			'"Courier New", Courier, monospace',
			'"Lucida Console", Monaco, monospace',
		]);
	};

	var getRandomColor = function() {
		return chance.color({format: 'hex'});
	};

	var n = 1;

	var getRandomTextSize = function() {
		return (1/64 + Math.random()) * n/4;
	};

	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x000000);
	document.body.appendChild(renderer.domElement);

	// var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(75, 1, n/128, 128*n);
	camera.position.set(0, 0, 8*n);

	var redrawInterval = 1;
	var autoRedraw = true;

	var sprites = Array.from({length: 88}, function() {
		var sprite = new THREE.TextSprite({
			textSize: getRandomTextSize(),
			redrawInterval: redrawInterval,
			material: {
				color: getRandomColor(),
			},
			texture: {
				text: getRandomText(),
				fontFamily: getRandomFontFamily(),
				autoRedraw: autoRedraw,
			},
		});
		sprite.position
			.setX(Math.random())
			.setY(Math.random())
			.setZ(Math.random())
			.subScalar(1/2)
			.setLength(1 + Math.random())
			.multiplyScalar(3*n);
		scene.add(sprite);
		return sprite;
	});

	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.maxDistance = camera.far/2;
	controls.enableDamping = true;
	controls.dampingFactor = 1/8;
	controls.rotateSpeed = 1/4;
	controls.zoomSpeed = 1;
	controls.keyPanSpeed = 1/2;

	// var renderScene = function() {
	// 	renderer.setSize(document.body.offsetWidth, document.body.offsetHeight);
	// 	camera.aspect = renderer.domElement.width / renderer.domElement.height;
	// 	camera.updateProjectionMatrix();
	// 	controls.update();
	// 	renderer.render(scene, camera);
	// };

	// window.addEventListener('resize', renderScene, false);

	// var startToRenderScene = function() {
	// 	setTimeout(function() {
	// 		requestAnimationFrame(startToRenderScene);
	// 	}, 1000/60);
	// 	renderScene();
	// };
	// startToRenderScene();

	var gui = new dat.GUI();
	(function() {
		var guiFolder = gui.addFolder('texture');
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
		var guiFolder = gui.addFolder('sprite');
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

})();