/* Herramientas de Interfaz */

var Interfaz = {
  frm_id : {},
  acciones : {},
  activar : function(fid){
    /* variables */
    this.frm_id = $(fid);
    /* generico */
    //this.anular_boton_derecho();
    this.setear_acciones();
  },
  setear_acciones : function(contexto){
    var THIS = this;
    contexto = $(contexto === undefined ? THIS.frm_id: contexto);
    var grp = $('[acc]',contexto);
    var i = 0;
    for(i; i< grp.length; i++) Acciones.activar(grp.eq(i))
  },
  mensaje : function(m, e){
    var dat = {
      mensaje: m,
      estilo: e !== undefined ? e : '',
    };
    var pla = _.template($('#plantilla_mensajes').html());
    var html = $(pla(dat));
    var eliminar = function(){ html.remove(); }
    var espera = 4 * 1000;
    V.bod.append(html);
    $('[cerrar]', html).eq(0).on('click',function(){ eliminar();});
    setTimeout(eliminar, espera);
  },

  confirmacion : function(msj,acsi,acno){
    var dat = {
      mensaje: msj,
    };
    var pla = _.template($('#plantilla_confirmacion').html());
    var html = $(pla(dat));
    V.bod.append(html);
    $('[resp=si]', html).eq(0).on('click', acsi);
    $('[resp=no]', html).eq(0).on('click', acno);
    $('[resp]', html).on('click', function(){
      html.remove();
    });
  },
};
