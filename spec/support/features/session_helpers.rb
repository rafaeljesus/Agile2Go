module Features
  module SessionHelpers

    def sign_in
      user = FactoryGirl.create :user
      sign_in_as user
      user
    end

    def sign_up
      user = sign_up_as FactoryGirl.build :user
      user
    end

    private
    def sign_in_as user
      visit new_user_session_path
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button I18n.t('btn.sign_in')
    end

    def sign_up_as user
      visit new_user_path
      fill_in 'user_name', with: user.name
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      fill_in 'user_password_confirmation', with: user.password_confirmation
      click_button I18n.t('btn.sign_up')
      user
    end
  end
end
