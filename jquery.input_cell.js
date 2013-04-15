(function($) {

    $.fn.inputCell = function(options) {
        var $this = $(this),
            font_family = "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace",
            o = $.extend({
                letter_spacing: "2ex",
                padding_left: '1px',
                linecolor: '#ccc',
                bgr_linewidth: '1',

        }, options);
        var bgr_linewidth = 1;

        $this.css('padding-left', o.padding_left);

        var set_common_styles = function($el) {
            $el.css('font-family', font_family);
            $el.css('letter-spacing', o.letter_spacing);
        };
        set_common_styles($this);

        var get_letter_width = function($input) {
            var $temp_div = $("<span></span>");

            set_common_styles($temp_div);
            $temp_div
                .css('font-size', $input.css('font-size'))
                .css('font-weight', $input.css('font-weight'));

            $temp_div.text('t');
            $input.after($temp_div);
            var w = $temp_div.width();
            $temp_div.remove();
            return w;
        };

        var get_background = function(width, height) {
            var canvas = $("<canvas></canvas>")[0];
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = o.linecolor;
            ctx.fillRect(width - o.bgr_linewidth, 0, o.bgr_linewidth, height);
            return canvas.toDataURL();
        };

        $this.each(function() {
            var $this = $(this);
            var letter_width = get_letter_width($this);
            var bgr = get_background(letter_width, $this.height());
            var size = $this.attr('size');
            //var corrected_size = letter_width * size - parseInt(o.padding_left) - o.bgr_linewidth;
            var corrected_size = letter_width * size;
            //$this.css('width', corrected_size + 'px');
            $this.css('background', "url(" + bgr + ")");

            var $wrapper = $("<div></div>");
            $this.after($wrapper);

            //console.log(
                //$this.css('border-right-width'),
                //$this.css('border-right-color'),
                //$this.css('border-right-style')
            //);
            $wrapper.css('border-right-width', $this.css('border-right-width'));
            $wrapper.css('border-right-color', $this.css('border-right-color'));
            $wrapper.css('border-right-style', $this.css('border-right-style'));

            $wrapper.append($this);
            $wrapper.css('width', corrected_size + 'px');
            $wrapper.css('overflow', 'hidden');

            $this.on('keydown', function(e, data) {
                if (e.keyCode === 39) {
                    if (doGetCaretPosition($this.get(0)) > (size - 2)) {
                        return false;
                    };
                }
            })

        });

        return $this;
    };

    /* this code from http://stackoverflow.com/questions/2897155/get-cursor-position-within-an-text-input-field/2897229#2897229 */
    /*
    ** Returns the caret (cursor) position of the specified text field.
    ** Return value range is 0-oField.value.length.
    */
    function doGetCaretPosition (oField) {
        var iCaretPos = 0;

        // IE Support
        if (document.selection) {

        // Set focus on the element
            oField.focus ();

            // To get cursor position, get empty selection range
            var oSel = document.selection.createRange ();

            // Move selection start to 0 position
            oSel.moveStart ('character', -oField.value.length);

            // The caret position is selection length
            iCaretPos = oSel.text.length;
        } 
        // Firefox support
        else if (oField.selectionStart || oField.selectionStart == '0') {
            iCaretPos = oField.selectionStart;
        }

        // Return results
        return (iCaretPos);
    }

})(jQuery);
