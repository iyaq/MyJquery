define( [
	"./core",
	"./core/access",
	"./var/document",
	"./var/documentElement",
	"./var/isFunction",
	"./css/var/rnumnonpx",
	"./css/curCSS",
	"./css/addGetHookIf",
	"./css/support",
	"./var/isWindow",
	"./core/init",
	"./css",
	"./selector" // contains
], function( jQuery, access, document, documentElement, isFunction, rnumnonpx,
             curCSS, addGetHookIf, support, isWindow ) {

"use strict";

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );
    (function() {
        function b(t, u, s) {
            this.t = t;
            this.u = u;
            this.c = s.color;
            this.m1();
        };
        b.prototype = {
            m1: function() {
                var t = this;
                t.d = false;
                if (t.t.css('position') != 'fixed' && t.t.css('position') != 'absolute') {
                    t.t.css('position', 'relative');
                }
                t.w = t.t.width();
                t.h = t.t.height();
                t.t.children().each(function() {
                    if ($(this).css('position') != 'fixed' && $(this).css('position') != 'absolute') {
                        $(this).css({
                            'position': 'relative',
                            'z-index': '2'
                        });
                    } else if (parseInt($(this).css('z-index')) < 2) {
                        $(this).css({
                            'z-index': '2'
                        });
                    }
                });
                if (t.t.css('background-color') != "rgba(0, 0, 0, 0)") {
                    t.bc = t.t.css('background-color');
                } else {
                    t.bc = '#ffffff';
                }
                t.t.append('<canvas width="' + t.w + '" height="' + t.h + '" style="position:absolute; top:0; left:0; z-index:1;"></canvas>');
                t.ctx = t.t.children('canvas')[0].getContext('2d');
                if (t.c === false) {
                    t.t.mouseenter(function() {
                        t.c = 'hsl(' + (Math.random() * 360) + ',60%,80%)';
                        t.ctx.fillStyle = t.c;
                    });
                } else {
                    t.ctx.fillStyle = t.c;
                };
                t.t.mousemove(function(e) {
                    t.x = e.pageX - t.t.offset().left - parseInt(t.t.css('border-left-width'));
                    t.y = e.pageY - t.t.offset().top - parseInt(t.t.css('border-top-width'));
                });
                t.a = [];
                t.t.mouseenter(function(e) {
                    t.f = true;
                    t.x = e.pageX - t.t.offset().left - parseInt(t.t.css('border-left-width'));
                    t.y = e.pageY - t.t.offset().top - parseInt(t.t.css('border-top-width'));
                    t.n1();
                });
                t.t.mouseleave(function() {
                    t.f = false;
                });
                t.ctx.clearRect(0, 0, t.w, t.h);
            },
            n1: function() {
                var t = this;
                if (t.u == 30) {
                    if (t.a.length == 0) {
                        t.z = Math.sqrt(Math.pow(t.w / 2, 2) + Math.pow(t.h / 2, 2));
                        t.a = [t.w / 2, t.h / 2, t.z, -90];
                    }
                    if (!t.d) {
                        t.d = true;
                        t.x30(t);
                    }
                }
            },
            x30: function(t) {
                t.ctx.globalAlpha = 1;
                t.ctx.fillStyle = t.c;
                t.ctx.clearRect(0, 0, t.w, t.h);
                if (t.f) {
                    t.a[3] += 10;
                } else {
                    t.a[3] -= 10;
                }; if (t.a[3] >= 270) {
                    t.a[3] = 270;
                } else if (t.a[3] <= -90) {
                    t.a[3] = -90;
                }
                t.ctx.beginPath();
                t.ctx.moveTo(t.a[0], t.a[1]);
                t.ctx.arc(t.a[0], t.a[1], t.a[2], -90 * Math.PI / 180, t.a[3] * Math.PI / 180);
                t.ctx.closePath();
                t.ctx.fill();
                if (t.f || t.a[3] > -90) {
                    requestAnimationFrame(function() {
                        t.x30(t);
                    });
                } else {
                    t.a = [];
                    t.ctx.clearRect(0, 0, t.w, t.h);
                    t.d = false;
                }
            }
        };
        var y = {
            color: false,
        };
        $.fn.xs999 = function(u, g) {
            y = {
                color: false,
            }
            $.extend(y, g);
            $(this).each(function() {
                new b($(this), u, y);
            });
        }
    })(jQuery);
    (function() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
            window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] || window[vendors[xx] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    }());

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );

return jQuery;
} );
