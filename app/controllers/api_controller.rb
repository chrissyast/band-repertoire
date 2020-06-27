class ApiController < ApplicationController
  before_action :validate_api_key
  skip_before_action :verify_authenticity_token

  def validate_api_key
    authenticate_or_request_with_http_token do |token|
      ApiKey.find_by_token(token)
    end
  end
end
