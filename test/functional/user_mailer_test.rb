require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test "contact" do
    mail = UserMailer.contact
    assert_equal "Contact", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "tryout" do
    mail = UserMailer.tryout
    assert_equal "Tryout", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
