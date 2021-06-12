/* Clase Utiles
 */

var Utiles = {
  reemplazar_masivo : function(t,l){
    var v = null;
    for(var k in l){
      t = t.split(k).join(l[k]);
    }
    return t;
  },
  num_a_tex : function(n,callback){
    $.post(
      './u/num_a_tex/',
      {n: n},
      callback
    );
  },
  texto : {
    ltrim : function(t) { return t.replace(/^\s+/,""); },
    rtrim : function(t){ return t.replace(/\s+$/,""); },
    trim : function(t) { return t.replace(/^\s+$/,""); }
  },
  valores_de_pedido : function(){
    var p = search;
    p = p.strip('?');
    return p;
  },
  url : {
    abrir_paralelo : function(t){
      window.open(t, '_blank');
    },
    abrir_por_post : function(o_url, target){
      if(target === undefined){
        target = '_blank';
      }
      var f = $('<form method="post" target="'+target+'" style="display:none;">');
      f.attr('action', [
        o_url.protocolo, '://',
        o_url.dominio, '/',
        o_url.ruta, 
        o_url.archivo,
      ].join(''));
      for(var k in o_url.pedido){
        f.append('<input name="'+k+'" value="'+o_url.pedido[k]+'">');
      }
      $('body').append(f);
      console.log(f);
      f.on({
        submit: function(){
          setTimeout(function(){
            f.remove();
          }, 2000);
        }
      });
      f.submit();
    },
    a_objeto :function(t){
      var tmp = t.split('://');
      var pro = tmp[0];
      tmp = tmp[1] !== undefined ? tmp[1].split('#') : tmp;
      var eti = tmp[1] !== undefined ? tmp[1] : '';
      tmp = tmp[0].split('?');
      var ped  = tmp[1] !== undefined ? tmp[1].split('&') : '';
      tmp = tmp[0].split('/');
      var dom = tmp.slice(0,1);
      var rut  = tmp.slice(1).join('/');
      var arc = '';

      if(! _.str.endsWith(rut, '/')){
        rut = rut.split('/');
        arc = rut.slice(-1);
        rut = rut.slice(0,-1).join('/');
      }
      
      var ped_obj = {};
      var tmp = [];
      for(var i in ped){
        tmp = ped[i].split('=');
        ped_obj[tmp[0]] = tmp[1];
      }
      
      return {
        'protocolo' : pro,
        'dominio' : dom,
        'ruta' : rut, 
        'archivo' : arc,
        'pedido' : ped_obj,
        'etiqueta' : eti
      };

    },
    a_texto : function(o){
      var pedido = []
      for(var k in o.pedido){
        pedido.push(k + '=' + o.pedido[k])
      }

      if(pedido.length > 0){
        pedido = '?' + pedido.join('&');
      }else{
        pedido = '';
      }
      return [
        o.protocolo, '://',
        o.dominio, '/',
        o.ruta, 
        o.archivo, 
        pedido
      ].join('');
    }
  },
};
