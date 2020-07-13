class Song < ApplicationRecord

  belongs_to :artist

  TASK_EXCLUDED_PARAMS = ["mbid","thumbnail"]
  COLUMN_MAPPINGS = {}

  def initialise(hash)
    hash.except(*TASK_EXCLUDED_PARAMS).each do |k,v|
      k = self.class::COLUMN_MAPPINGS[k] || k
      unless k === "artist"
        public_send("#{k}=",v)
      else
        artist = Artist.where(:name => v).first_or_create
        self.artist_id =artist.id
      end
    end
  end
end
