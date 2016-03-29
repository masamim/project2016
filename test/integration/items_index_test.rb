require 'test_helper'

class ItemsIndexTest < ActionDispatch::IntegrationTest
  def setup
    @admin = users(:michael)
    @broke_user = users(:archer)
    @broke_player = @admin.player
    file = File.read("app/assets/items/items.json")
    @items = JSON.parse(file)
    @item = @items[items.keys[0]]
  end
  
  test "index" do
    log_in_as(@admin)
    get items_path
    assert_select 'p', "Gold: " + @admin.player.gold.to_s
    assert_template 'items/index'
    assert_select 'input[type=?]', "submit", count: @items.count
    assert_select 'input[type=?]', "number", count: @items.count
    @items.each do |name, array|
      assert_select 'a[href=?]', item_path(name), text: name
      assert_select 'td', "Price: " + array["price"].to_s + " G"
      assert_select 'input[type=?]', "hidden", value: array["price"]
    end
  end
end
