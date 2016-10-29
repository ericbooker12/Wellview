class CreateWells < ActiveRecord::Migration[5.0]
  def change
    create_table :wells do |t|
      t.string :name
      t.string :location
      t.string :start_date
      t.string :end_date
      t.float :total_depth
      t.references :rig, foreign_key: true

      t.timestamps
    end

    add_index :wells, :rig_id
  end
end
