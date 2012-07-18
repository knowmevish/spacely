class ImagesController < ApplicationController

	def create
		puts params.inspect
		if params[:url].blank?
			image = Space.upload_image(params, current_space)
		else
		 	image = Space.upload_url(params,current_space)
		end
    render :json => {:err => image[:err], :data => image[:data]}
	end

	def index
		images = Space.where(:token => current_space)
		imgs = []
		images.each do |image|
		imgs << { 
			:id => image.id,
			:img_url => image.image_url,
			:img_url_thumb => image.image_url(:thumb)
		}
		end
		render :json => imgs
	end

	def destroy
		puts params.inspect
		image = Space.delete_image(params, current_space)
		render :json => {:err => image[:err], :data => image[:data]}
	end

	def getimages
		images = Space.where(:token => params[:token])
		imgs = []
		images.each do |image|
		imgs << { 
			:id => image.id,
			:img_url => image.image_url,
			:img_url_thumb => image.image_url(:thumb)
		}
		end
		render :json => imgs
	end
end
