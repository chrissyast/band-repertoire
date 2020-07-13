class User < ApplicationRecord
  has_secure_password
  has_many :repertoires
  has_many :songs, through: :repertoires
end
