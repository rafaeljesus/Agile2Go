var App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  events: {},

  semanticUI: function(){
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.ui.popup').popup();
    $(".rotate").textrotator({ animation: "dissolve", separator: ",", speed: 6000 });
  },

  start: function(){
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  },

  init: function() {
    var user_session = new App.Models.UserSession({});
    user_session.fetch({});
    new App.Views.Menu({ user_session: user_session });
    new App.Routers.Projects({});
    new App.semanticUI();
    new App.start();
 }

}))({ el: document.body });

$(function(){
  App.init();
});
