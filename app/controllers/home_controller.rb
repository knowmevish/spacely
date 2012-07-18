class HomeController < ApplicationController
  
  def index 
    redirect_to the_space_path(current_space)
  end 

  def upload 
    image = Space.upload_image(params)
    redirect_to "/"
  end 

end
