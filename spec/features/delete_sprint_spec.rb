require 'spec_helper'

feature 'when delete sprint' do
  scenario 'when I delete a sprint', js: true do
    sign_in
    sprint = FactoryGirl.create :sprint
    delete_sprint sprint
    expect(page).to have_content I18n.t('flash.actions.destroy.notice', model: 'Item')
  end
end
