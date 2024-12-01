/* Definicion e Implementacion de Interactividad y Acciones Dinámicas */

/* variables */
var V = {
    win : {},
    doc : {},
    htm : {},
    bod : {},
    nav : {},
};

_.templateSettings = {
    evaluate:/\<\{([\s\S]+?)\}\>/g,
    interpolate: /\<\{\=(.+?)\}\>/g,
    escape:/\<\{\-([\s\S]+?)\}\>/g

};

/* inicializacion */
$(document).bind({
	ready : function(){
        V.win = $(window);
        V.doc = $(this);
        V.htm = $('html').eq(0);
        V.bod = $('body').eq(0);
        V.nav = $.browser;

        Cruzapalabras.lista = lista_de_palabras.split(',');
        Cruzapalabras.lista.push(' ');

        Interfaz.activar('#pagina');
    }
});
$(window).bind({
	load : function(){},
	resize : function(){},
	mouseenter : function(e){},
    beforeunload : function(){}
});
