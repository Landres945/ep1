$(function()
{
	var ancho = window.innerWidth;
	var alto = window.innerHeight;
	var lienzo = new THREE.WebGLRenderer({alpha: true});
	lienzo.setSize(ancho, alto);
	document.body.appendChild(lienzo.domElement);
	var escena 		  = new THREE.Scene,
		tamanoSol			=	180;
		tamanoJupiter = 150;
		tamanoTierra  =	150;
		tamanoMarte	  =	150;
		tamanoVenus   = 150;
		tamanoMercurio = 150;
		var posPlaneta = 0;
		var pos2Planeta = 7;
		var cargarJson = function()
    {

        $.getJSON( "js/datos.json", function(data)
        {
            datos = data;
						retroPlaneta();
        });
    }();
	var crearPlaneta = function(data)
	{
		var geometria = new THREE.SphereGeometry(data.tamano,data.tamano,data.tamano);
		var textura = THREE.ImageUtils.loadTexture(data.imagen);
		var material = new THREE.MeshBasicMaterial( { map: textura } );
		return new THREE.Mesh(geometria, material);
	};

	/*var jupiter = crearPlaneta({
									tamano 	: tamanoJupiter,
									imagen	: 'img/jupiter.jpg'
							  }),
	escalaJupiter = true;
	escena.add(jupiter);*/
	//
	var Planetas = [sol = crearPlaneta({
									tamano 	: tamanoSol,
									imagen	: 'img/sol.jpg'
							  }),mercurio = crearPlaneta({
																tamano 	: tamanoMercurio,
																imagen	: 'img/mercurio.jpg'}),
									venus = crearPlaneta({
								  tamano 	: tamanoVenus,
									imagen	: 'img/venus.jpg'}),
									tierra = crearPlaneta({
									tamano 	: tamanoTierra,
									imagen	: 'img/tierra.jpg'}),
									marte = crearPlaneta({
									tamano 	: tamanoMarte,
									imagen	: 'img/marte.jpg'}),
									jupiter = crearPlaneta({
									tamano 	: tamanoJupiter,
									imagen	: 'img/jupiter.jpg'})];



					$("#boton").click(function(event)
						{

							posPlaneta++;
							console.log(posPlaneta);
							if (posPlaneta === 1) {

								escena.remove(Planetas[0]);
								escena.add(Planetas[1]);
							}
							if (posPlaneta === 2) {
								escena.remove(Planetas[1]);
								escena.add(Planetas[2]);
							}
							if (posPlaneta === 3) {
								escena.remove(Planetas[2]);
								escena.add(Planetas[3]);
							}
							if (posPlaneta === 4) {
								escena.remove(Planetas[3]);
								escena.add(Planetas[4]);
								$("#areaJson").html(datos[0]);
							}
							if (posPlaneta === 5) {
								escena.remove(Planetas[4]);
								escena.add(Planetas[5]);
							}
							if (posPlaneta === 6) {
								posPlaneta = 0;
								escena.remove(Planetas[5]);
								escena.add(Planetas[6]);
							}

								});
var retroPlaneta = function ()
{
								nom_div("boton2").addEventListener('click', function(event)
									{
										pos2Planeta--;
										if (pos2Planeta === 0) {
											pos2Planeta = 7;
											escena.remove(Planetas[1]);
											escena.add(Planetas[0]);
											$("#Json").html(datos[0].nombre);
											$("#Json").html(datos[0].descripcion);
										}
										if (pos2Planeta === 1) {

											escena.remove(Planetas[2]);
											escena.add(Planetas[1]);
										}
										if (pos2Planeta === 2) {
											escena.remove(Planetas[3]);
											escena.add(Planetas[2]);
										}
										if (pos2Planeta === 3) {
											escena.remove(Planetas[4]);
											escena.add(Planetas[3]);
										}
										if (pos2Planeta === 4) {
											escena.remove(Planetas[5]);
											escena.add(Planetas[4]);
										}
										if (pos2Planeta === 5) {
											escena.remove(Planetas[6]);
											escena.add(Planetas[5]);
										}
										if (pos2Planeta === 6) {

											escena.add(Planetas[6]);
										}

									});
				}();
function nom_div(botton)
    {
    	return document.getElementById(botton);
    }
		function nom_div(textarea)
		    {
		    	return document.getElementById(textarea);
		    }
	var camara = new THREE.PerspectiveCamera(50,(ancho / alto),0.1, 10000);
	escalaPlanetas = true;
	escena.add(Planetas[0]);
	//nom_div("Json").innerHTML= datos[0];
	/*escena.add(Planetas[1]);
	escena.add(Planetas[2]);
	escena.add(Planetas[3]);
	escena.add(Planetas[4]);*/
	camara.position.y = 160;
	camara.position.z = 400;
	camara.lookAt(sol.position);
	sol.position.x	   =	-180;
	jupiter.position.x = -180;
	marte.position.x =	-180;
	tierra.position.x = -180;
	venus.position.x =	-180;
	mercurio.position.x = -180;
	escena.add(camara);
	function renderizar()
	{
		sol.rotation.y	+= 0.007;
		jupiter.rotation.y += 0.001;
		marte.rotation.y	+= 0.05;
		tierra.rotation.y += 0.06;
		venus.rotation.y	+= 0.06;
		mercurio.rotation.y += 0.08;
		lienzo.render(escena, camara);
		requestAnimationFrame(renderizar);
	}
	renderizar();
});
