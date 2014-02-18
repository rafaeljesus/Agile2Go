module Features
  module SprintHelpers

    def create_sprint current_user
      new_sprint = FactoryGirl.build :sprint
      sprint = create_sprint_as(new_sprint, current_user)
      sprint
    end

    def update_sprint sprint
      visit "#sprints/#{sprint.id}/edit"
      fill_in 'name', with: 'new sprint name'
      submit
    end

    def delete_sprint sprint
      visit '#sprints'
      execute_script("$('.confirm').click();")
      execute_script("$('.delete').click();")
    end

    private
    def create_sprint_as(new_sprint, current_user)
      visit '#sprints/new'
      fill_in 'name', with: new_sprint.name
      fill_in 'daily', with: new_sprint.daily
      fill_in 'points', with: new_sprint.points
      fill_in 'start-date', with: new_sprint.start_date
      fill_in 'end-date', with: new_sprint.end_date
      execute_script("$('select').val(#{new_sprint.project.id}).trigger('change')")
      submit
      new_sprint
    end

    def submit
      find("[type='submit']").click
    end

  end
end
