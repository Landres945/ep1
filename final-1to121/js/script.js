 $(function()
{

var timer = 0;
var reto=121;
var usados = [];
var dimensiones = 11;
var objetivo=1;
var ayudas=3;
var matriz=[[],[],[],[],[],[],[],[],[],[],[]];
var animaciones=["animated tada","animated flash","animated wobble","animated zoomIn","animated rotateIn","animated swing"];
var animacion=0;




inicia();
//funcion la cual permite cargar las "funciones" que se cargaran al comienzo
function inicia ()
  {
    botones();
    cargarSonidos();
    crearEscenario();
    numerosMatriz();
  }

  //Funcion que permite cargar los sonidos
  function cargarSonidos ()
    {
      var audios = [

                        {
                            sonido  :   "click.mp3",
                            label   :   "click"
                        },
                        {
                            sonido  :   "alert.mp3",
                            label   :   "alert"
                        },
                        {
                            sonido  :   "wawa.mp3",
                            label   :   "wawa"
                        },
                        {
                            sonido  :   "ohno.mp3",
                            label   :   "ohno"
                        }
                      ];


      for(var audio = 0; audio < audios.length; audio++)
      {
          createjs.Sound.registerSound("sonidos/" + audios[audio].sonido, audios[audio].label);
      };
    };
// Funcion que permite llenar la matriz con los numeros del reto, en este caso 121
function numerosMatriz ()
  {
    do
        {
        for (var i = 0; i < matriz.length; i++)
            {
                for (e=0; e<matriz.length; e++)
                {

                         matriz[i][e]=aleatorio(reto);
                };
            };
        }

        while(matriz.length===12)

        for (i=0; i<matriz.length; i++)
            {
                for (e=0; e<matriz.length; e++)
                  {
                    $('#'+i+"_"+e).html(matriz[i][e]).css('color', randomColor());
                  };
            };
  }


//Funcion que permite crear la tabla general para los numeros
function crearEscenario ()
    {
        var txt = "<table id = 'chess_board' cellpadding = '0' cellspacing = '0' >";
        var divTabla = "";
        for(var i = 0; i < dimensiones; i++)
        {
            txt += "<tr>";
            for(var c = 0; c < dimensiones; c++)
            {
                divTabla = i + "_" + c;
                txt += "<td id = '"+(divTabla)+"'></td>";
            }
            txt += "</tr>";


        }
        txt += "</table>";
        $("#escenario").html(txt);


          $("#chess_board").css
                          ({
                             "width"                : 70+"px",
                              "height"              : 550+"px",
                              "font-weight"         : "bold",
                              "font-family"         : "Arial",
                              "line-height"         : 5+"px",
                              "cursor"              : "pointer",
                              "text-align"          :"center",
                              "font-size"           : "35px",
                              "margin-top"        :   "50px"
                              //"margin"              :"auto"

                         });

        clickCelda();


    };

//funcion la cual permite generar los numeros aleatorios y agregar los numeros utilizados al array usados
function aleatorio(min)
{
    if (usados.length !=  min)
    {
        var num;
        var repe= false;
            do
            {
                var num=Math.floor((Math.random()*min)+1);
                repe = repetido(num);
            }

            while (repe != false);
                usados.push(num);
                return num;
    }

    else
    {
    return 0;
    }
}

//funcion para validar los numeros repetidos dentro del array usados
function repetido(num)
{
    var repe = false;
        for (var i = 0; i < usados.length; i++)
        {
            if (num == usados[i])
            {
                repe = true;
            }
        }
  return repe;

}


//funcioon para validar los click de cada celda
function clickCelda ()
    {
        for(var i = 0; i < dimensiones; i++)
        {
            for(var c = 0; c < dimensiones; c++)
            {
             $("#" + i + "_" + c).click(function(event)
                {
                  if (event.toElement.innerHTML==objetivo)
                  {
                        createjs.Sound.play("click");
                        $("#"+event.toElement.id).removeClass();
                        $("#"+event.toElement.id).addClass(animaciones[animacion]).css
                        ({
                             "color"              : 'white',
                             "background-color"   : randomColor(),
                             "font-weight"        : "bold",
                             "border-radius"      : "50%"
                        });
                        objetivo++;
                        if (event.toElement.innerHTML === objetivo && objetivo === 121)
                        {
                            swal({
                                    title   : "!Felicitaciones!",
                                    text    : "Lo haz conseguido en "+ timer +" segundos",
                                    timer   :  5000
                                });

                                location.reload();
                        };
                              $("#objetivo").html(objetivo);

                            }
                          else {

                                  createjs.Sound.play("alert");

                          };
                          });
                        };
                      };
                    };




//Funcion que permite capturar el click dl boton play para iniciar
$("#playb").click(function(event)
  {
    botones();
    tiempo = setInterval(function()
      {
        timer++;
        $("#tiempo").html(timer + " ' ");
      }, 1000);
      $("#playb").attr("disabled",true);
  });

//funcion que permite capturar el click del boton ayuda
$("#ayuda").click(function(event)
  {
    ayudas--;

    for (i=0; i < matriz.length; i++)
      {
        for (e=0; e < matriz.length; e++)
          {
            if($('#'+i+"_"+e).html()==objetivo)
              {
                  $('#'+i+"_"+e).removeClass();
                  $('#'+i+"_"+e).addClass(animaciones[animacion]).css
                  ({
                      "color"              : 'white',
                      "background-color"   : randomColor(),
                      "font-weight"        : "bold",
                      "border-radius"      : "35%"
                  });

                  animacion++;
                  //validacion para que las animaciones no se terminen
                  if (animacion==5)
                    {
                      animacion=0;
                    };

                        $("#ayuda").html(ayudas);
                      };

              if (ayudas === 0)
               {
                    createjs.Sound.play("ohno");
                    $("#ayuda").hide();
                    swal
                      ({
                          title               : "!OOOPPPS!",
                          text                :"Se han acabado las ayudas.",
                          showCancelButton    : false,
                          confirmButtonColor  : "#DD6B55",
                          confirmButtonText   : "Aceptar",
                          closeOnConfirm      : false,
                          timer               : 5000,

                      });



                };
          };
      };
  });


//Funcion que permite capturar el click del boton salir
$("#salir").click(function(event)
  {
    createjs.Sound.play("wawa");
    swal({
            title               : "¿Estas seguro?",
            text                : "Perderás tu logro",
            type                : "warning",
            showCancelButton    : true,
            confirmButtonColor  : "#DD6B55",
            confirmButtonText   : "Reiniciar!",
            cancelButtonText    : "No, Cancelar",
            closeOnConfirm      : false,
            closeOnCancel       : false
          },

        function(isConfirm)
        {
          if (isConfirm)
            {

                swal
                ({
                    title             : "Cargando",
                    text              : "Recargando página...",
                    showConfirmButton : false
                });

                setTimeout(location.reload(), 2000);
            }
            else
              {

                swal
                ({
                    title   : "Reinicio Cancelado",
                    type:"error",
                    timer:2200
                });
              };
        });
  });


//funcion que contiene y ejecuta todos los botones
function botones ()
  {
    $("#play").hide('slow');
    $("#escenario").show();
    $("#tiempo").css('display', 'inline-block').show();
    $("#salir").css('display', 'inline-block').show();
    $("#ayuda").css('display', 'inline-block').show();
    $("#objetivo").css('display', 'inline-block').show();


  };



function randomColor ()
    {
        // from http://www.paulirish.com/2009/random-hex-color-code-snippets/
        return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
        (c && lol(m,s,c-1))})(Math,'0123456789ABCDEF',4);
    };

});
