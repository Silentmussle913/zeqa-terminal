@echo off
setlocal enabledelayedexpansion

:: Define the ZIP file name
set "zipFileName=Zeqa-Terminal.zip"

:: Check if the ZIP file exists in the current directory
if not exist "%zipFileName%" (
    echo Error: %zipFileName% not found in the current directory.
    pause
    exit /b
)

:: Create a temporary folder for extraction
set "tempDir=%~dp0temp_extract"
if exist "%tempDir%" rd /s /q "%tempDir%"
mkdir "%tempDir%"

:: Extract the ZIP file to the temporary directory
echo Extracting %zipFileName%...
tar -xf "%zipFileName%" -C "%tempDir%" || (
    echo Error: Failed to extract the ZIP file.
    pause
    exit /b
)

:: Navigate to the 'Packaged Version' folder
set "packagedDir=%tempDir%\Packaged Version"
if not exist "%packagedDir%" (
    echo Error: 'Packaged Version' folder not found inside the ZIP file.
    rd /s /q "%tempDir%"
    pause
    exit /b
)

:: Remove read-only, hidden, and system attributes from all files and folders
echo Removing attributes from all files and folders...
attrib -h -s -r /s /d * >nul 2>&1

:: Delete everything in the current directory except this batch file and the temp folder
echo Deleting existing files and folders...
for /f "delims=" %%i in ('dir /b /a-d') do (
    if /i not "%%~nxi"=="%~nx0" del /f /q "%%i"
)
for /d %%i in (*) do (
    if /i not "%%~nxi"=="temp_extract" rd /s /q "%%i"
)

:: Copy all files and folders from 'Packaged Version' to the current directory
echo Copying files to the current directory...
xcopy "%packagedDir%\*" "%~dp0" /s /e /y >nul 2>&1

:: Clean up the temporary extraction directory
rd /s /q "%tempDir%"

:: Self-delete the batch file
echo Deleting script...
del /f /q "%~f0"

echo Done!
pause
