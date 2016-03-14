class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.float :latitude
      t.float :longitude
      t.string :address
      t.string :title

      t.timestamps null: false
    end
    
    add_index :places, :address
  end
end