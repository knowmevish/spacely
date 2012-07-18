CarrierWave.configure do |config|
  # Load from .yml file
  CARRIER_WAVE_CONFIG = YAML.load_file("#{Rails.root}/config/carrierwave_config.yml")[Rails.env]
  
  config.fog_credentials = {
    :provider               => "AWS",       # required
    :aws_access_key_id      => CARRIER_WAVE_CONFIG['aws_access_key_id'], 
    :aws_secret_access_key  => CARRIER_WAVE_CONFIG['aws_secret_access_key'],
  }
  
  config.fog_directory  = CARRIER_WAVE_CONFIG['fog_directory']
  #config.fog_host       = 'https://assets.example.com'
  config.fog_public     = false
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end