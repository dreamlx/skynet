class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :qq
      t.string :unit
      t.string :mobile_phone
      t.string :phone
      t.string :leave_message_string

      t.timestamps
    end
  end
end
