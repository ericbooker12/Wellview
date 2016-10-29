class MeasurementsController < ApplicationController
	def index
		@well1 = Well.find(1)
		@well2 = Well.find(2)
		@well3 = Well.find(3)
		@data1 = @well1.measurements
		@data2 = @well2.measurements
		@data3 = @well3.measurements
		render :json => @data2
	end

	def td

		totalDepth = Measurement.last.depth

		if request.xhr?
		    # AJAX is expecting a string or JSON object
		    p 'ajax Requested'
		    p totalDepth
			render :json => totalDepth
		else
			# redirect "/posts"
		end
		# p @totalDepth
	end

	def show
	end

end
