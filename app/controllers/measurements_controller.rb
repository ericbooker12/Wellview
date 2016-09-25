class MeasurementsController < ApplicationController
	def index
		@data = Measurement.all
		render :json => @data
	end

end
