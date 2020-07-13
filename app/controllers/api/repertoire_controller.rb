module Api
  class RepertoireController < ApiController

    before_action :validate_params

    def validate_params
      missing_params = []
      param_not_an_array = []
      param_array_not_a_hash = []
      result = []
      ["add","delete"].each do |p|
        if !params[p]
          puts p
          missing_params << p
        elsif !params[p].is_a? Array
          puts p
          param_not_an_array << p
        elsif !params[p].first.is_a? Hash
          param_array_not_a_hash << p
        end

      end

      result << ("missing params: #{missing_params.join(", ")}") unless missing_params.empty?
      result << ("param is not an array: #{param_not_an_array.join(", ")}") unless param_not_an_array.empty?
      result << ("param is not an array of objects: #{param_array_not_a_hash.join(", ")}") unless param_array_not_a_hash.empty?
      render :json => {result: result} unless missing_params.empty?
    end

    def save
      adds = params["add"].as_json
      deletions = params["delete"].as_json
      errors = []
      adds.each do |add|
        begin
          #song = Song.create_or_find_by!(title: song.title, artist: song.artist)
          #song.initialise(add) unless song
          song = Song.create_or_find_by!(title: song.title, artist: song.artist)
          song.initialise(add) unless song
          song.save
        rescue StandardError => e
          puts 'this is the error'
          puts e
          errors << e.record.errors
        end
      end

      deletions.each do |del|
        ##song = Song.where()
        puts del
        binding.pry
      end
      ## TODO deletions

      if errors.empty?
        render :json => {success: true}
      else
        render :json => {success: false, errors: errors}
      end
    end
  end
end

