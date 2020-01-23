initial_folder="src/public/portfolio/original" # You can use "." to target the folder in which you are running the script for example
resized_folder_name="../resized"

all_images=$(find -E $initial_folder -iregex ".*\.(jpg|gif|png|jpeg)")

while read -r image_full_path; do
    filename=$(basename "$image_full_path");
    source_folder=$(dirname "$image_full_path");
    destination_folder=$source_folder"/"$resized_folder_name"/";
    destination_full_path=$destination_folder$filename;

    if [ ! -z "$image_full_path" -a "$image_full_path" != " " ] &&
        # Do not resize images inside a folder that was already resized
        [ "$(basename "$source_folder")" != "$resized_folder_name" ]; then 

        mkdir "$destination_folder";
        # If you are not using this in an OSX system, you can use imagemagick's "convert" command instead (http://www.imagemagick.org/script/convert.php)
        sips -Z 700 -s formatOptions 65 -s format jpeg "$image_full_path" --out "$destination_full_path";

    fi

find $initial_folder"/"$resized_folder_name -name "*.png" | while read file; do mv "$file" "`echo $file | sed -e 's/png/jpg/'`"; done

done <<< "$all_images"
