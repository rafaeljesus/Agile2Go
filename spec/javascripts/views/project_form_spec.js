describe('App.Views.ProjectForm', function(){
  var view
  , users
  , model
  , $el
  , e;

  var commit = function(){
    view.$('#name').val('nameFake');
    view.$('#company').val('companyFake');
    view.$('#description').val('descriptionFake');
    view.$('select')[0].options[0] = new Option(users.at(0).get('name'), users.at(0).get('id'));
    view.$('select').val(users.at(0).get('id')).trigger('change');
  };

  beforeEach(function(){
    users = new App.Collections.Users([{ id: 1, name: 'userNamefake', email: 'email@fake.com' }]);
    view = new App.Views.ProjectForm({ users: users });
    view.render();
    model = view.model;
    e = new Event(undefined);
  });

  afterEach(function(){
    view.$('#name').val('');
    view.$('#company').val('');
    view.$('#description').val('');
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

  it('should persists a new model', function(){
    spyOn(model, 'save');
    view.$('#name').val('nameFake');
    view.$('#company').val('companyFake');
    view.$('#description').val('descriptionFake');
    view.save(e);
    expect(model.save).toHaveBeenCalled();
  });

  it('should commit model', function(){
    commit();
    view.commit();
    expect(model.isValid()).toBeTruthy();
    expect(model.assignedUsers).toEqual(users.toArray());
  });

  it('should assigne users', function(){
    expect(model.assignedUsers.length).toEqual(0);
    view.$('select')[0].options[0] = new Option(users.at(0).get('name'), users.at(0).get('id'));
    view.$('select').val(users.at(0).get('id')).trigger('change');
    view.commit();
    expect(model.assignedUsers.length).toEqual(1);
  });

  it('should render on assigned user', function(){
    var assignedUsers = view.$('select')[0].options;
    expect(assignedUsers.length).toEqual(1);
  });

  it('should render multiple assigned users', function(){
    var twoMoreUsers = [{ id: 2, name: 'userNamefake2'}, { id: 3, name: 'userNamefake3' }];
    users.add(twoMoreUsers);
    view.render();
    var assignedUsers = view.$('select')[0].options;
    expect(assignedUsers.length).toEqual(users.length);
  });

  it('should assigneeIds match number of selected users', function(){
    commit();
    expect(view.assigneeIds().length).toEqual(users.length);
  });

});