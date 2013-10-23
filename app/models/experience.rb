class Experience < ActiveRecord::Base
  attr_accessible :company, :mail, :mobile, :msg, :name, :phone, :qq
  validates :mail, presence: true
  validates :company, presence: true
  validates :mobile, presence: true
  validates :name, presence: true

end
