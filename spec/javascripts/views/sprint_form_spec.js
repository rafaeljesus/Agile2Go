describe('App.Views.SprintNew', function(){
  var view
  , model
  , projects
  , $el
  , e
  ;

  var commit = function(){
    view.$('#name').val('SprintFake');
    view.$('#daily').val('10:00');
    view.$('#points').val(300);
    view.$('#start-date').val('01-01-2014');
    view.$('#end-date').val('14-01-2014');
    view.$('select')[0].options[0] = new Option(projects.at(0).get('name'), projects.at(0).get('id'));
    view.$('select').val(projects.at(0).get('id')).trigger('change');
  };

  beforeEach(function(){
    projects = new App.Collections.Projects([{ id: 1, name: 'projectFake', company: 'companyFake', description: 'descriptionFake' }]);
    view = new App.Views.SprintForm({ projects: projects });
    view.render();
    model = view.model;
    e = new Event(undefined);
  });

  afterEach(function(){
    view.$('#name').val('');
    view.$('#daily').val('');
    view.$('#points').val('');
    view.$('#start-date').val('');
    view.$('#end-date').val('');
    view.$('select')[0].options = [];
  });

  it('should call onRender when instantiate', function(){
    spyOn(view, 'onRender');
    view.render();
    expect(view.onRender).toHaveBeenCalled();
  });

  it('should not persists a empty model', function(){
    spyOn(model, 'save');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid).toBeTruthy();
  });

  it('should not persists when daily is invalid', function(){
  });

  it('should not persists when start_date is invalid', function(){
  });

  it('should not persists when end_date is invalid', function(){
  });

  it('should not persists when points is not a number', function(){
  });

  it('should commit model', function(){
    commit();
    view.commit();
    expect(model.isValid()).toBeTruthy();
    expect(model.project).toEqual(view.model.project);
  });

  it('should persists a model', function(){
    spyOn(model, 'save');
    commit();
    view.save(e);
    expect(model.save).toHaveBeenCalled();
  });

});
