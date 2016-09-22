class MeasurementsController < ApplicationController
	def index
		@data = Measurement.all
		render :json => @data
	end

	def new 

	end

end
