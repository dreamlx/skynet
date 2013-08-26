class CreateExperiences < ActiveRecord::Migration
  def up
    create_table :experiences do |t|
      t.string :name
      t.string :mail
      t.string :qq
      t.string :company
      t.string :mobile
      t.string :phone
      t.string :msg

      t.timestamps
    end
  end

  def down
    drop_table :experiences
  end
end
