#!/usr/bin/bash

if [ $# -lt 2 ]
  then
    echo "Usage: chord|demo num_hosts"
    exit
fi

sh generate_hosts.sh $2

if [ "$1" = "chord" ]; then
  ssh -f compute-8-2 "node /home/ssa169/Distrubuted-System/chord/server.js"
elif [ "$1" = "demo" ]; then
LINE=1
while read -r NODE
   do
     echo "$LINE: $NODE"
     ssh -f $NODE "node /home/ssa169/Distrubuted-System/chord/server.js"
     ((LINE++))
 done < "./hostfile"
elif [ "$1" = "dynamic" ]; then
  mpirun -np $2 -hostfile hostfile RoadMapDynamic
fi