App.Views.UserSessionsNew = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'authenticated', 'onModelError');
    this.current_user = options.current_user;
    this.model = new App.Models.UserSession({});
    this.model.on('error', this.onModelError);
  },

  template: JST['user_sessions/new'],

  events: {
    'click .submit': 'authenticate'
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  authenticate: function(e){
    e.preventDefault();
    this.commit();
    if(!this.model.isValid()) this.model.trigger('error');
    else this.model.save({}, { success: this.authenticated });
  },

  commit: function(){
    var email = this.$("#email").val(),
        password = this.$("#password").val();
    this.model.set({ email: email, password: password });
  },

  authenticated: function(model, response, options){
    this.current_user.set({ signed_in: true, id: model.attributes.session.user_id });
    this.rootPath();
    this.authenticatedSuccess();
  },

  authenticatedSuccess: function(){
     var message = I18n.t('sessions.signed_in');
     new FlashMessages({ message: message }).success();
  },

  onModelError: function(model, response, options){
    if(this.model.validationError) {
      var attributesWithErrors = this.model.validationError;
      new ErrorView({ el: $('form'), attributesWithErrors: attributesWithErrors }).render();
    } else {
      this.clearOldErrors();
      var jsonResponse = JSON.parse(response.responseText);
      new FlashMessages({ message: jsonResponse.errors.base }).error();
    }
  },

  clearOldErrors: function() {
    this.$('.error').removeClass('error');
    this.$('div.ui.red.pointing.above.ui.label').remove();
  },

  rootPath: function(){
    window.location.hash = '#';
  }

});
