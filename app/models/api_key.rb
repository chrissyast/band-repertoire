class ApiKey < ApplicationRecord
  before_create :generate_access_token

  def generate_access_token
    self.token = SecureRandom.base64
  end
end
