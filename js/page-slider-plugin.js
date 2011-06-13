/**
 * This is a jquery slider plugin that allows you to 
 * 
 *
 */

(function( $ ){
    // default settings
    var settings = {};
    var wrapper,height,width,page=1,pages=0;
    // methods
    var methods = {
        init : function( options ) {
            height = (this.height());
            width = (this.width());
            this.css("position","relative");
            this.css("overflow","hidden");
            $.extend( settings, options );
            return this.each(function(){
                var panels = $(this.children).wrapAll('<div id="brentisinyourdom"/>');
                wrapper = panels.parent();
                pages=wrapper[0].children.length;
                wrapper.css('position','relative');
                wrapper.height(height)
                wrapper.width( width* (wrapper[0].children.length) )
                wrapper.css('border','0px');
                var i = 0;
                panels.each(function(){
                    $(this).height(height)
                    $(this).width(width)
                    $(this).css('border','0px')
                    $(this).css('padding','0px')
                    i++;
                    $(this).css('display','block')
                    $(this).css('position','relative')
                    $(this).css('float','left')                                
                });
            });
        },
        /**
         * takes a callback who get this:
         * {page:page,pages:pages}
         */
        next : function( cb ) {
            if(page==pages)return;
            page++;
            wrapper.animate({
                left: '-='+width
            }, 500, 'linear', function() {
                $("#page").html("page "+page+"/"+pages)
                if(cb)cb({
                    page:page,
                    pages:pages
                });
            });
        },
        /**
         * takes a callback who get this:
         * {page:page,pages:pages}
         */
        prev : function( cb ) {
            if(page==1)return;
            page--;
            //"translate3d("+draw.x+"px, "+draw.y+"px, 0) scale("+scale+") ";
            wrapper.animate({
                left: '+='+width
            }, 500, 'swing', function() {
                $("#page").html("page "+page+"/"+pages)
                if(cb)cb({
                    page:page,
                    pages:pages
                });
            }); 
        }
    };                
    $.fn.slide = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.slide' );
        }
        return this;
    };
                
})( jQuery );

