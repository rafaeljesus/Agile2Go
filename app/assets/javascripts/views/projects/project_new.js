App.Views.ProjectNew = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'saved', 'unSaved');
    this.users = options.users;
    this.newTask();
    this.bindTo(this.users, 'add', this.render);
  },

  events: {
    'click .submit': 'save'
  },

  render: function(){
    this.renderTemplate();
    this.select2();
    return this;
  },

  renderTemplate: function(){
    this.$el.html(JST['projects/form']({ model: this.model.toJSON(), users: this.users.toJSON() }));
  },

  newTask: function(){
    this.model = new App.Models.Project();
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if(!this.model.isValid()){
      this.formValidationError();
    } else {
      this.model.save({}, { success: this.saved, error: this.unSaved });
    }
    return false;
  },

  commit: function(){
    var name = this.$('#name').val()
    , description = this.$('#description').val()
    , company = this.$('#company').val()
    ;
    this.model.set({ name: name, description: description, company: company });
    this.model.assignedUsers = new App.Collections.Users(this.assignedUsers());
  },

  assignedUsers: function(){
    var self = this;
    return _.uniq(_.compact(_.map(this.assigneeIds(), function(id) {
      return self.users.get({ id: id });
    })));
  },

  assigneeIds: function(){
    return this.$('select').find('option:selected').map(function(n, select){
      return $(select).val();
    });
  },

  saved: function(model, response, options) {
     this.projectsPath();
     this.savedMsg();
  },

  unSaved: function(model, xhr, options){
    var errors = JSON.parse(xhr.responseText).errors;
    new FlashMessages({ message: errors }).error();
  },

  select2: function(){
    this.$('select').select2({ placeholder: 'Select a User' });
  },

  projectsPath: function(){
    window.location.href = '#projects';
  },

  savedMsg: function(){
     var message = I18n.t('flash.actions.create.notice', { model: 'Project' });
     new FlashMessages({ message: message }).success();
  },

  formValidationError: function(){
    var message = this.model.validationError;
    new FlashMessages({ message: message }).error();
  }

});
