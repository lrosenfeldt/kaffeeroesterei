#!/usr/bin/env bash
# Deploy with GitHub Pages

# set options
# fail on any failed command or undefined variable
set -eu
# pipe should fail if any command in it fails
set -o pipefail

# save global ARGS
ARGS="$@"

display_help() {
  cat <<EOF
Usage: deploy [-h]

  -h display this help
EOF
}

# modify href paths in JS because parcel doesn't handle it
replace_js_hrefs() {
  js_files="./dist/*.js"
  for file in ${js_files[@]}; do
    if (contains_link "$file"); then
      echo -e "$file - parsing...\n"
      sed -i.bak 's/\(href="\)\//\1\/kaffeeroesterei\//g' "$file"
    else
      echo -e "$file - doesn't contain any links to parse \n"
    fi
  done
  # delete backup files
  bak_files="./dist/*.bak"
  for file in ${bak_files[@]}; do
    echo "deleting backup: $file"
    rm "$file"
  done
}

contains_link() {
  file="$1"
  cat "$file" | grep -E 'href="\/' 1>/dev/null
}

run() {
  public_url="/kaffeeroesterei"

  while getopts :hp: opt; do
    case $opt in
    h)
      display_help
      return 0 ;;
    ?)
      echo "ERROR: Unknown option -$OPTARG"
      return 1
    esac
  done

  # clean up and build
  echo -e "Starting deploy...\n"
  echo "  clean"
  ./.clean.bash
  echo -e "\n  build"
  yarn parcel build src/index.html --public-url "$public_url"
  # make dynamically generated links github-page compliant
  echo -e "\n postbuild: parse html-in-js links"
  replace_js_hrefs
  echo -e "\n  deploy"
  yarn gh-pages -d dist
}

run "${ARGS[@]}"