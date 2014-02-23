App.Views.SprintsIndex = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView,
  _.extend({}, App.Mixins.Modal, {
  initialize: function(){
    _.bindAll(this, 'render');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    this.addPrettyDateHelper();
  },

  events: {
    'click .confirm': 'showModal',
    'click .delete': 'delete'
  },

  template: JST['sprints/index'],

  serializeData: function(){
    return this.collection.toJSON();
  }

})));
