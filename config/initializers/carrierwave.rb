CarrierWave.configure do |config|
  
  config.fog_credentials = {
    :provider               => "AWS",       # required
    :aws_access_key_id      => ENV['aws_access_key_id'], 
    :aws_secret_access_key  => ENV['aws_secret_access_key'],
  }
  
  config.fog_directory  = ENV['fog_directory']
  #config.fog_host       = 'https://assets.example.com'
  config.fog_public     = false
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end