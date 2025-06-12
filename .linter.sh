#!/bin/bash
cd /home/kavia/workspace/code-generation/civicconnect-28483-1a71ed7c/civicconnect_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

