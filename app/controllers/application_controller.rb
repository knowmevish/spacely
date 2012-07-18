class ApplicationController < ActionController::Base
# protect_from_forgery
  def current_space 
    cookies[:spacely_token] = Digest::SHA1.hexdigest([Time.now, rand].join).slice(0..6) if cookies[:spacely_token].blank?
    return cookies[:spacely_token]
  end 
 
end
