var max_chars = 80;//Caracteres maximos permitidos para el comentario del pedido
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    
/**
 * Alert mostrado a nivel de línea
 * @param {type} mensaje
 * @param {type} tipo
 * @param {type} class
 * @returns {InlineAlert}
 */
function InlineAlert(mensaje, tipo ,clase)
{
    this.mensaje = mensaje;
    this.clase = "";

    if(clase == undefined)
    {
        clase = "";
    }

    if(tipo == undefined)
    {
        tipo = "default";
    }

    switch(tipo)
    {
        case "danger":
            this.clase = "alert alert-danger miAlert " + clase;
        break;
        case "success":
            this.clase = "alert alert-success miAlert " + clase;
        break;
        case "info":
            this.clase = "alert alert-info miAlert " + clase;
        break;
        case "warning":
            this.clase = "alert alert-warning miAlert " + clase;
        break;
        default:
            this.clase = "alert alert-secondary miAlert " + clase;
        break;
    }



    this.toHTML = function() {

        var html = "<div style=\"margin-top: 4px; margin-bottom: 4px;\" class=\"" + this.clase + "\">";
        html = html + this.mensaje;

        html = html + "</div>";

        return html;
    };

    this.ClearAlert = function(){
        $(".miAlert").remove();
    }
}


/**
 * Bot&oacute;n modal dialog
 * @param {type} label
 * @param {type} icono
 * @param {type} evento
 * @returns {CarritoModalBoton}
 */
function CarritoModalBoton(label,icono,evento)
{
    this.label = "";
    this.icono = "";

    if(label!==undefined && label!==null)
    {
        this.label = label;
    }

    if(icono!==undefined && icono!==null)
    {
        this.icono = icono;
    }

    this.tipo = 'button';
    this.class = "btn btn-outline-dark";

    if(evento===undefined || evento===null)
    {
        this.evento ="$('#dialogModal').modal('hide');";
    }
    else
    {
        this.evento = evento;
    }

    this.toHTML = function() {
        var html ="<button type=\""+this.tipo+"\"";

        html += " class=\""+this.class+"\"";

        html += " onclick=\""+this.evento+"\"";

        html += ">";

        if(this.icono!=="")
        {
           html += "<span class=\""+this.icono+"\">"+this.label+"</span>";
        }
        else
        {
            html += this.label;
        }

        html += "</button>";
        return html;
    };
}

function CarritoModalMSG(titulo,contenido, botones)
{
    this.htmlContenido = contenido;
    this.htmlTitulo= titulo;
    this.botones = [];
    if(botones === undefined || botones ===null)
    {
        var btncancelar = new CarritoModalBoton("Cerrar");

        this.botones = [btncancelar];
    }

    this.mostrarDialogo = function(){

       
        $("#modalTitleLabel").html(this.htmlTitulo);
        $("#modalContent").html(this.htmlContenido);

        if($.isArray(this.botones))
        {
            var boton;
            $("#modalFooter").html("");

            for (boton of this.botones) {

                $("#modalFooter").html($("#modalFooter").html() + boton.toHTML());
            }
        }

        $('#dialogModal').modal('toggle');
        
       
    };
    
    this.setFull = function(){
        $(".modal-dialog").addClass("modal-dialog-full");  
    };
    
    this.overWriteContenido = function(contenido){

        $("#modalContent").html(contenido);
    };

    this.overWriteBotones = function(){

        if($.isArray(this.botones))
        {
            var boton;
            $("#modalFooter").html("");

            for (boton of this.botones) {

                $("#modalFooter").html($("#modalFooter").html() + boton.toHTML());
            }
        }
    };

    this.iniciaBotones= function(botones)
    {
        this.botones = botones;
    };

    this.agregarBoton=function(boton)
    {
        this.botones.push(boton);
    };

    this.clearFoot = function(){
        this.botones = new Array();

        $('#modalFooter').html("");
    };

    this.cerrarDialogo = function(){
        $('#dialogModal').modal('hide');
    };
}

function seleccionaCategoria(categoria)
{
    $("#dropdownMenuButton").html(categoria);
}