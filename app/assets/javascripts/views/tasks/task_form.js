App.Views.TaskForm = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {

  template: JST['tasks/form'],

  initialize: function(options) {
    _.bindAll(this, 'render', 'saved');
    this.model = options.model || this.newModel();
    this.sprints = options.sprints;
    this.users = this.model.findUsers();
    this.bindTo(this.sprints, 'add', this.render);
    this.bindTo(this.users, 'add', this.render);
    this.observe();
    this.registerHelpers();
  },

  serializeData: function() {
    return {
      model: this.model.toJSON(),
      sprints: this.sprints.toJSON(),
      users: this.users.toJSON()
    };
  },

  events: {
    'click .submit': 'save'
  },

  onRender: function() {
    this.renderSprint();
    this.renderUsers();
    this.thirdComponents();
    return this;
  },

  renderSprint: function() {
    this.$('#sprint').val(this.model.sprint.id).trigger('change');
  },

  renderUsers: function() {
    this.$('#users').val(this.model.users.toIds());
  },

  save: function(e) {
    e.preventDefault();
    this.commit();
    if (this.model.isValid()) {
      this.model.save({}, { success: this.saved });
    }
    return false;
  },

  commit: function() {
    var attributes = {
      status: this.$('#status').val(),
      priority: this.$('#priority').val(),
      points: this.$('#points').val(),
      title: this.$('#title').val(),
      story: this.$('#story').val()
    };
    this.model.set(attributes);
    this.model.sprint = this.sprints.get({ id: this.selectedSprint() });
    this.model.users = this.users.findByIds(this.selectedUsersIds());
  },

  selectedSprint: function() {
    var selected = this.$('#sprint').find('option:selected');
    return _.first(selected.map(this.setOptionValue));
  },

  selectedUsersIds: function() {
    var selected = this.$('#sprint').find('option:selected');
    return selected.map(this.setOptionValue);
  },

  setOptionValue: function(n, select) {
    return $(select).val();
  },

  saved: function(model, response, options) {
     window.location.hash = '#tasks';
     var message = I18n.t('flash.actions.create.notice', { model: 'Task' });
     this.successMessage(message);
  },

  newModel: function() {
    return new App.Models.Task();
  },

  registerHelpers: function() {
    new App.HandlebarsHelpers().withDiffDate();
  },

  thirdComponents: function() {
    this.$('#sprint').select2();
    this.$('#users').select2();
    this.$('.ui.dropdown').dropdown();
  }

})));
