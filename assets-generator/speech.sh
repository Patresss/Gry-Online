#!/bin/bash
#################################
# Speech Script by Dan Fountain #
#      TalkToDanF@gmail.com     #
#################################

INPUT="$1"
NAME_OF_FILE="$2"
DEST_PATH="$3"
STRINGNUM=0

echo Text to speach: $INPUT $NAME_OF_FILE to $DEST_PATH
 
ary=($INPUT)
for key in "${!ary[@]}" 
  do
    SHORTTMP[$STRINGNUM]="${SHORTTMP[$STRINGNUM]} ${ary[$key]}"
    LENGTH=$(echo ${#SHORTTMP[$STRINGNUM]})
    if [[ "$LENGTH" -lt "100" ]]; then
      SHORT[$STRINGNUM]=${SHORTTMP[$STRINGNUM]}
    else
      STRINGNUM=$(($STRINGNUM+1))
      SHORTTMP[$STRINGNUM]="${ary[$key]}"
      SHORT[$STRINGNUM]="${ary[$key]}"
    fi
done
 
for key in "${!SHORT[@]}"
  do
    NEXTURL=$(echo ${SHORT[$key]} | xxd -plain | tr -d '\n' | sed 's/\(..\)/%\1/g')
	echo "http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$NEXTURL&tl=pl"
	curl -o ${DEST_PATH}/${NAME_OF_FILE}.mp3 "http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$NEXTURL&tl=pl"
done
