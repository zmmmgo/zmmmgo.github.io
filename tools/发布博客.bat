@echo off
chcp 65001 >nul
title 博客发布助手
echo ========================================
echo        博客一键发布助手
echo ========================================
echo.
cd /d C:\Users\zmg\my-blog

echo [1/3] 保存修改...
git add -A
git -c user.name="zmmmgo" -c user.email="zmmmgo@users.noreply.github.com" commit -m "更新博客 %date% %time%"
if errorlevel 1 (
    echo.
    echo 没有新的修改需要发布(或者有问题)。
    echo 如果你刚写了新文章,请确认保存了文件。
    pause
    exit /b
)

echo [2/3] 上传到 GitHub...
git push origin master
if errorlevel 1 (
    echo.
    echo 上传失败!请检查网络,或截图给我看。
    pause
    exit /b
)

echo [3/3] 触发网站更新...
echo.
echo ========================================
echo   ✅ 发布成功!
echo   网站正在自动更新(约 1-2 分钟生效)
echo   网址: https://zmmmgo.github.io/
echo ========================================
pause
