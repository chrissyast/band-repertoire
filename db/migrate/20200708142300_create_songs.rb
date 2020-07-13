class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs do |t|
      t.timestamps
      t.string :name
      t.string :thumbnail
      t.string :mbid
      t.belongs_to :artist
    end
  end
end
