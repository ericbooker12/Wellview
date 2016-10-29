class CreateMeasurements < ActiveRecord::Migration[5.0]
  def change
    create_table :measurements do |t|
      t.float :depth
      t.float :rop
      t.float :wob
      t.float :temp_in
      t.float :temp_out
      t.float :pressure
      t.references :well, foreign_key: true

      t.timestamps
    end
    add_index :measurements, :well_id
  end
end
