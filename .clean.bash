#!/usr/bin/env bash
# Simple clean up script for a lean dist folder after deploy

# set options
# fail on any failed command or undefined variable
set -eu
# pipe should fail if any command in it fails
set -o pipefail

# save global ARGS
ARGS="$@"

display_help() {
  cat <<EOF
Usage: clean [-hn]

  -h display this help
  -n also delete node_modules
EOF
}

run() {
  targets=(
    "dist"
  )

  while getopts :hn opt; do
    case $opt in
    h)
      display_help
      return 0 ;;
    n) 
      targets+=("node_modules")
    esac
  done

  for target in "${targets[@]}"; do
    rm -rf "$target"
  done
}

run "${ARGS[@]}"