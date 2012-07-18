class SpacesController < ApplicationController

  def show 
    if current_space != params[:token]
      @share_token = params[:token]
      render "spaces/public_space" and return 
    end 
  end 

end
