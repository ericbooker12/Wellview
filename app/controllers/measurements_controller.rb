class MeasurementsController < ApplicationController
	def index
		# @data = Measurement.all
		# @data = Measurement.find

		render :json => @data
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
