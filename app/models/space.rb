class Space < ActiveRecord::Base

   mount_uploader :image , ImageUploader

  class << self 

    def upload_url(params, current_space)
      return {:err => "e1", :data => nil} if params[:url].blank?
      image = Space.new
      image.token = current_space
      image.remote_image_url = params[:url]
      image.save  
      data = []
      data << {
        :id => image.id,
        :img_url => image.image_url,
        :img_url_thumb => image.image_url(:thumb)
      }
      puts "hello"
      puts data.inspect
      return {:err => nil, :data => data}
    end

    def upload_image(params, current_space)
      return {:err => "e1", :data => nil} if params[:ourfile].blank?
      #space.remote_space_url_url = params[:remote_space_url
      image = Space.new
      image.token = current_space
      image.image = params[:ourfile]
      image.save  
      data = []
      data << {
        :id => image.id,
        :img_url => image.image_url,
        :img_url_thumb => image.image_url(:thumb)
      }
      return {:err => nil, :data => data}
    end

    def delete_image(params, current_space)
      return {:err => "e1", :data => nil} if params[:id].blank?
      image = Space.where(:id=>params[:id], :token => current_space).first
      return {:err => "e2", :data => nil} if space.blank?
      image.delete
      return {:err => nil, :data => true}
    end
  end
end