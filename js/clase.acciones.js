/* Clase Acciones */

var Acciones = {
    activar : function(oj){
        var THIS = this;
        var dat = oj.attr('acc').split(';');
        if(THIS.acc[dat[0]] != undefined){
            if(dat[1] === 'iniciar'){
                THIS.acc[dat[0]](dat.slice(2),oj)
            }else{
                oj.on(dat[1],function(){
                    THIS.acc[dat[0]](dat.slice(2),oj)
                });
            }
        }else{
            console.error('ERROR: acción inexistente: ', dat[0]);
        }
    },
    acc : {
        ir : function(v){
            window.location.href = v[0];
        },
        recargar : function(v){
            window.location.reload();
        },
        setear_cruzapalabras : function(v, o){
            let palabra = 'relación y azar';
            let entrada = $('#'+v[0]);
            if(window.location.hash !== ''){
                palabra = decodeURIComponent(window.location.hash.replace('#', ''));
                entrada.val(palabra);
            }
            if(palabra == ''){
                palabra = entrada.val();
            }

            Cruzapalabras.setear_palabra(palabra);

            Cruzapalabras.setear_palabra(palabra);
            o.html(Cruzapalabras.construir_bloque());
        },
        actualizar_cruzapalabras : function(v, o){
            o.on({
                keyup: function(){
                    if(Cruzapalabras.es_distinto(o.val())){
                        Cruzapalabras.setear_palabra(o.val());
                        $('#'+v[0]).html(Cruzapalabras.construir_bloque());
                    }
                }
            });
        },
    }
};
