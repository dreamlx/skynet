class UserMailer < ActionMailer::Base

  email_config = YAML::load(File.read(Rails.root.to_s + '/config/email_config.yml'))

  default from: "#{email_config['email']}"
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.contact.subject
  #
  def consult(consult)
    @consult = consult
    mail to: "#{@consult.email}", subject: 'consult'
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.tryout.subject
  #
  def post_experience(experience)
    @experience = experience
    mail to: "#{@experience.mail}", subject: 'experience'
  end
end
