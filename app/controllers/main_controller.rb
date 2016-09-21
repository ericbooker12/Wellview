class MainController < ApplicationController
  def index
  	all_measurements = Measurement.all
  	all_measurements.to_json
  	p all_measurements.to_json
  end
end
