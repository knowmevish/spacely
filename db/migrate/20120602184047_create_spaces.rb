class CreateSpaces < ActiveRecord::Migration
  def change
    create_table :spaces do |t|
      t.string :token
      t.string :image

      t.timestamps
    end
  end
end
