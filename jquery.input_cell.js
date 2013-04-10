(function($) {
    $.fn.inputCell = function(options) {
        var $this = $(this),
            font_family = "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace",
            o = $.extend({
                letter_spacing: "2ex",
                padding_left: '1px',
                linecolor: '#ccc'
        }, options);

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
            return w
        };

        var get_background = function(width, height) {
            var canvas = $("<canvas></canvas>")[0];
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = o.linecolor;
            ctx.fillRect(width - 1, 0, 1, height);
            return canvas.toDataURL();
        };

        $this.each(function() {
            var $this = $(this);
            var letter_width = get_letter_width($this);
            var bgr = get_background(letter_width, $this.height());
            $this.css('background', "url(" + bgr + ")");
        });

        return $this;
    };
})(jQuery);
