/* Clase Cruzapalabras */

var Cruzapalabras = {
  palabra : '',
  lista : [],
  setear_palabra : function(p){
      if(p !== undefined){
          this.palabra = p.toLowerCase();
          window.location.hash = p;
      }


  },
  es_distinto : function(p){
    p = p.toLowerCase();
    return this.palabra !== p;
  },
  h_linea : function(t, e){
    if(t === undefined) t = this.palabra;
    if(e === undefined) e;
    var ll = this.letras(t);
    var ht = [];
    for(var i in ll)
      ht.push('<span>'+ll[i].trim()+'</span>');
    return '<p class="'+e+'">'+ht.join('')+'</p>';
  },
  letras : function(t){
    return t.split('');
  },
  buscar : function(b){
    var r = [];
    var v = '';
    var c = undefined;
    for(var i in this.lista){
      v = this.lista[i];
      if(v.indexOf(b) >= 0){
        r.push(v);
      }
    }
    return r;
  },
  extraer_coincidencias : function(){
    var ll = this.letras(this.palabra);
    var r = {};
    var v = undefined;
    for(var i in ll){
      v = ll[i];
      if(r[v] === undefined){
        r[v] = this.buscar(v);
      }
    }
    return r;
  },
  construir_bloque : function(){
    var l = this.extraer_coincidencias();
    var ll = this.letras(this.palabra);
    var r = [];
    var v = undefined;
    var p = undefined;
    var max = 0;
    var h = [];
    var proc = undefined;
    var palab = undefined;
    var desp = 0;
    var psel = '';
    // seleccion de palabra
    for(var i in ll){
      v = ll[i];
      p = _.shuffle(l[v])[0];
      r.push([v, p]);
    }
    // busqueda de signo
    for(var i in r){
      psel = r[i][1] === undefined ? r[i][0] : r[i][1];
      proc = this.marcar(psel, r[i][0]);
      r[i][1] = proc.p;
      r[i].push(proc.d);
      if(proc.d > max) max = proc.d;
    }
    // generacion de html
    for(var i in r){
      desp = max - r[i][2]
      palab = ' '.repeat(desp) + r[i][1];
      h.push(this.estilizar(this.h_linea(palab, 'fila'), desp + r[i][2]));
    }
    return h.join('');
  },
  estilizar : function(h, p){
    var $h = $(h);
    var $e = $('span', $h).eq(p);
    $e.addClass('destacado');
    return $h[0].outerHTML;
  },
  marcar : function(t, m){
    var pos = t.indexOf(m);
    var r = [
      t.substring(0, pos),
      t.substr(pos,1).toUpperCase(),
      t.substring(pos + 1)
    ];
    return {
      d: pos,
      p: r.join('')
    };
  }
};
