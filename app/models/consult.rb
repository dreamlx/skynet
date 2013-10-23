class Consult < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :email, :name, :phone
  validates :email, presence: true
  validates :name, presence: true
  validates :phone, presence: true
end
