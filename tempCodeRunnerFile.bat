@echo off
call git pull origin main
call git add .
call git commit -m JSProject
call git push -u origin main
echo "Complete"