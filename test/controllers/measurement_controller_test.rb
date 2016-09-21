require 'test_helper'

class MeasurementControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get measurement_index_url
    assert_response :success
  end

end
