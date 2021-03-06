class SessionsController < ApplicationController
  
  def new
  end

  def create
    user = User.find_by(username: params[:session][:username].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      # condition ? if true : if false
      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
      redirect_back_or user # Default: could redirect to the hub page instead of the profile?
    else
      flash.now[:danger] = 'Invalid username/password combination'
      render 'new'
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end
end
