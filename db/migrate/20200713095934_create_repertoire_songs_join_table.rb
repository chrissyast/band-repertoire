class CreateRepertoireSongsJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :repertoires, :songs do |t|
      t.index :repertoire_id
      t.index :song_id
    end
  end
end
