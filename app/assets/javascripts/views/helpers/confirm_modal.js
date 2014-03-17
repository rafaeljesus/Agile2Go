App.Views.ConfirmModal = Backbone.View.extend({
  id: '#modal',
  className: 'ui small modal',
  tagName: 'div',

  initialize: function(options){
    _.bindAll(this, 'render', 'deleted');
    this.model = options.model;
    this.$removable = options.$removable;
  },

  template: JST['modal'],

  events: {
    'click .delete': 'delete'
  },

  serializeData: function(){
    return { name: this.model.get('name'), id: this.model.get('id') };
  },

  render: function(){
    this.$el.html(this.template(this.serializeData()));
    this.show();
    return this;
  },

  delete: function(e){
    e.preventDefault();
    this.model.destroy({ success: this.deleted() });
    return false;
  },

  deleted: function(){
    this.$removable.remove();
    this.hide();
    var message = I18n.t('flash.actions.destroy.notice', { model: 'Item' });
    new FlashMessages({ message: message }).success();
  },

  show: function(){
    this.$el.modal('show');
  },

  hide: function(){
    this.$el.modal('hide');
    this.$el.remove();
  }

});
