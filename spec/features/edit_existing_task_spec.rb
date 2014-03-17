require 'spec_helper'

feature 'when edit existing task' do
  scenario 'when I change the task title', js: true do
    sign_in
    task = FactoryGirl.create :task
    update_task task
    expect(page).to have_content I18n.t('flash.actions.create.notice', model: 'Task')
  end
end
