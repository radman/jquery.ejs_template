// Author: Radu Vlad
// Date: September 29, 2009

/***
 * EJS Template Widget (TODO: clean up delegation)
 *  Dependencies
 *   - ejs templating plugin
 *
 *  This plugin finds all elements with class 'ejs-template', and for each element:
 *    - attaches the template to the element itself (via jquery's data method)
 *    - when calling update, it updates all the elements with the given params
 *    - TODO: be more clear about what this plugin does
 *
 ***/

(function($){

  $.fn.ejsTemplate = function(fn, params) {

    /* Private variables */

    var self = this;

    if (fn == undefined)
      initialize();
    else if (fn == "update")
      update(params);

    /* Public functions */

    function update(params) {
      $.each(self.data("containers"), function() {
        var template = this.data("template");
        template.update(this[0], params);
      });
    }

    /* Private functions */

    function initialize() {
      var ejsTemplates = self.find(".ejs-template");
      var containers = [];

      $.each(ejsTemplates, function() {
        var ejsTemplate = $(this);
        var container = ejsTemplate.parent();

        container.data("template", new EJS({ text: ejsTemplate.html() }));
        containers.push(container);
      });

      self.data("containers", containers);
    }


    /* Allow chaining */

    return self;

  };
  
})(jQuery);
