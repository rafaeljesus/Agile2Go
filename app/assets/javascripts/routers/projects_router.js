App.Routers.Projects = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.RouterHelper, {
    initialize: function(options){
      this.current_user = options.current_user;
      this.el = $('#container');
      this.collection = new App.Collections.Projects({});
      this.users = new App.Collections.Users({});
     },

    routes: {
      'projects': 'index',
      'projects/new': 'new',
      'projects/:id/edit': 'edit'
    },

     index: function(){
      if(!this.authorize()) return;
      this.collection.fetch({});
      var view = new App.Views.ProjectsIndex({ collection : this.collection });
      this.swap(view);
    },

    new: function(){
      if(!this.authorize()) return;
      this.users.fetch({});
      var view = new App.Views.ProjectNew({ users: this.users });
      this.swap(view);
    },

    edit: function(id){
      if(!this.authorize()) return;
      var self = this;
      $.getJSON("/projects/" + id  + "/edit").done(function(json){
        var model = new App.Models.Project(json[0]);
        this.users = new App.Collections.Users(json[1]);
        var view = new App.Views.ProjectEdit({ model: model, users: this.users });
        self.swap(view);
      });
    }
}));
