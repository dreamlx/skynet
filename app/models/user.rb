class User < ActiveRecord::Base
  attr_accessible :email, :leave_message_string, :mobile_phone, :name, :phone, :qq, :unit
end
