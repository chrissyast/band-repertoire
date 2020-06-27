class UpdateController < ApiController
  def something
    render :json => {result: "foo"}
  end
end

