#!/bin/bash

PARAMM=""
SCRIPT_NAME="./speech.sh"
while IFS=";" read -r name_of_file text; do
    ./speech.sh \""$text"\" "$name_of_file" "../src/assets/words/audio"
done < words.txt