#!/bin/bash
#
# Creates a base set of files for a given component
#
if [ -z "$2" ]
then
  echo "You must provide a path for your $1. i.e. './scripts/generate.sh $1 src/components/MyComponent'"
  echo ""
  exit 1
fi
# convert to an absolute path
path=$(cd "$(dirname "$2")"; pwd)/$(basename "$2")
echo "Path: $path"

# run from within the template folder
cd "$(dirname "$0")"
cd $1

# name of the component - used for subsitutions
IFS='/' read -a strarr <<< "$path"
COMPONENT_NAME="${strarr[@]: -1:1}"
COMPONENT_FOLDER="${strarr[@]: -2:1}"
echo "Checking: $COMPONENT_FOLDER/$COMPONENT_NAME"

for f in $(find * -type f); do
  target="$path/$f"
  if [[ -f "$target" ]]; then
    echo "Skipping $target"
  else
    # ensure the directory exists, e.g. _tests
    mkdir -p "$(dirname "$target")"
    cp "$f" $target
    sed -i '' "s/COMPONENT_NAME/$COMPONENT_NAME/g" $target
    sed -i '' "s/HOOK_NAME/$COMPONENT_NAME/g" $target
    sed -i '' "s/COMPONENT_FOLDER/$COMPONENT_FOLDER/g" $target
    sed -i '' "s/HOOK_FOLDER/$COMPONENT_FOLDER/g" $target
    echo "Creating $target"
  fi
done;
