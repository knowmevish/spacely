class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick
  permissions 0777

  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  #storage :file
   storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    icons = ["https://asset0.37img.com/global/default_avatar_v1_3/avatar.40.gif" , "https://asset0.37img.com/global/default_avatar_v1_5/avatar.40.gif"]
    icons[rand(2)]
  end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  version :thumb do
    process :resize_to_limit => [170, 170]
  end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_white_list
     %w(jpg jpeg gif png)
   end

end
