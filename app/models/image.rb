class Image < ActiveRecord::Base

   mount_uploader :image_url , ImageUploader

  class << self 

    def upload_url(params)
      return {:err => "e1", :data => nil} if params[:url].blank?
      #Image.remote_image_url_url = params[:remote_image_url
      image = Image.new
      image.uid=1
      image.remote_image_url_url = params[:url]
      image.save  
      data = []
      data << {
        :id => image.id,
        :img_url => image.image_url_url.to_s
      }
      puts "hello"
      puts data.inspect
      return {:err => nil, :data => data}
    end

    def upload_image(params)
      return {:err => "e1", :data => nil} if params[:ourfile].blank?
      #Image.remote_image_url_url = params[:remote_image_url
      image = Image.new
      image.uid=1
      image.image_url = params[:ourfile]
      image.save  
      data = []
      data << {
        :id => image.id,
        :img_url => image.image_url_url.to_s
      }
      return {:err => nil, :data => data}
    end

    def delete_image(params)
      return {:err => "e1", :data => nil} if params[:id].blank?
      Image.delete(params[:id])
      return {:err => nil, :data => true}
    end
  end
end
