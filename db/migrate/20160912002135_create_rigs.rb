class CreateRigs < ActiveRecord::Migration[5.0]
  def change
    create_table :rigs do |t|
      t.string :name
      t.string :company

      t.timestamps
    end
  end
end
