@echo off
title FinFlow - Personal and Family Cashflow Manager
cd /d "%~dp0"
echo =======================================================
echo Dang khoi dong FinFlow Server...
echo =======================================================
start "" "http://localhost:3000"
agy-node.cmd server.js
pause
