class StaticPagesController < ApplicationController
  before_action :logged_in_user, only: :hub
  def index
    # Users are now by default ordered by points. Check user.rb.
    @users = User.first(10)
  end
end
