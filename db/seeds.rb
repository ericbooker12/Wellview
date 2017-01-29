# # # Seed data from file
require 'faker'

Rig.delete_all
Well.delete_all
Measurement.delete_all

10.times do
	Rig.create(
		name: "Rig #{Faker::Number.number(1)}",
		company: Faker::Company.name
	)
end

# Seed 3 wells
i = 1
3.times do
	new_well = Well.new(
		name: "#{Faker::Name.first_name}-#{Faker::Number.number(2)}",
		location: "N 416524.0, E 1769412.4",
		start_date: Faker::Date.between(2.years.ago, 1.year.ago),
		end_date: Faker::Date.between(1.year.ago, Date.today),
		total_depth: Faker::Number.number(4),
		rig_id: i )
	new_well.save!

	print "=" * 5 * i
	p "Well #{i} created"
	i += 1


end

 data = Measurement.new(
		depth: 0,
		rop: 0,
		wob: 0,
		temp_in: 0,
		temp_out: 0,
		pressure: 0,
		well_id: 1
	)
 data.save!


rows = []
File.foreach("depth.txt") do |line|  # read in one line/row at a time
	row = line.split(" ") 			# convert each row to an array

	i = 0
	new_row = []
	while i < 6						# only get the first 6 columns
		new_row << row.shift.to_f	# convert the elements to a decimal/float
		i += 1						# and shovel into another array
	end
	rows << new_row					# shovel row array into array
end 								# end up with double array representing rows and columns

i = 0
rows.each do |row|					#[69.00, 139.30, 35.90, 54.30, 58.42, 635.66]

	data = Measurement.new(
		depth: row[0],
		rop: row[1],
		wob: row[2],
		temp_in: row[3],
		temp_out: row[4],
		pressure: row[5],
		well_id: 3
	)
	data.save!

	if i % 100 == 0
		j = i / 100
		print "=" * j
		p " #{i} lines"
	end

	i += 1
end

# data = Measurement.new(
# 		depth: 7623,
# 		rop: 0,
# 		wob: 0,
# 		temp_in: 0,
# 		temp_out: 0,
# 		pressure: 0,
# 		well_id: 1
# 	)
#  data.save!

# # Seed rig data
# Rig.create(
# 	name: "Rig 3",
# 	company: Faker::Company.name
# )



# Seed well data
# 10.times do
# 	Well.create(
# 		name: "#{Faker::Name.first_name}-#{Faker::Number.number(2)}",
# 		location: "N 416524.0, E 1769412.4",
# 		start_date: Faker::Date.between(2.years.ago, 1.year.ago),
# 		end_date: Faker::Date.between(1.year.ago, Date.today),
# 		total_depth: Faker::Number.number(4)
# 	)
# end

# rows = []
# File.foreach("depth1.txt") do |line|  # read in one line/row at a time
# 	row = line.split(" ") 			# convert each row to an array

# 	i = 0
# 	new_row = []
# 	while i < 6						# only get the first 6 columns
# 		new_row << row.shift.to_f	# convert the elements to a decimal/float
# 		i += 1						# and shovel into another array
# 	end
# 	rows << new_row					# shovel row array into array
# end 								# end up with double array representing rows and columns

# rows.each do |row|					#[69.00, 139.30, 35.90, 54.30, 58.42, 635.66]

# 	data1 = Measurement.new(
# 		depth: row[0],
# 		rop: row[1],
# 		wob: row[2],
# 		temp_in: row[3],
# 		temp_out: row[4],
# 		pressure: row[5],
# 		well_id: 2
# 	)
# 	data1.save!
# end


# iterate through header.dat file
# header = File.open('header.dat', File::RDONLY) do |f|
# 	f.read
# end

# array = header.lines.map(&:split)

# header.strip!

# # replace any white spaces that occur 3 or more times w/'###'
# header.gsub!(/\s{3,}/, '###')
# header_data = header.split('###')

# p header_data




