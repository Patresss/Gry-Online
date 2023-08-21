#!/bin/bash

PARAMM=""
SCRIPT_NAME="./speech.sh"
while IFS=";" read -r litera porownanie; do
    ./speech.sh \""$porownanie"\" "$litera" "../src/assets/single-digit/audio"
done < digits.txt