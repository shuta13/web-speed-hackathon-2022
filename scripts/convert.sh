ext=.webp

for entry in ./*
do
  if [[ $entry == *"jpg"* ]]; then
    name=${entry%.*}
    newfile=$name$ext
    cwebp $entry -o $newfile
    rm $entry
  fi
done
