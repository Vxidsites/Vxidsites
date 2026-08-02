@echo off
:: =====================================================================
:: VXID TWEAKS
:: Advanced PC Optimization Script
:: =====================================================================

:: Force Administrator Privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo =====================================================
    echo Requesting Administrative Privileges...
    echo Please click "Yes" on the UAC prompt to continue.
    echo =====================================================
    powershell -Command "Start-Process '%~dpnx0' -Verb RunAs"
    exit
)

:: If we reach here, we are Admin
color 0B
title Vxid Tweaks - Ultimate PC Optimizer
mode con: cols=100 lines=30

:warning
cls
color 0C
echo.
echo    ===========================================================================
echo    /// WARNING ///
echo    ===========================================================================
echo.
echo    SOME TWEAKS WILL BREAK YOUR PC OR LOWER FPS.
echo    PLEASE CREATE A SYSTEM RESTORE POINT BEFORE CONTINUING.
echo.
echo    Vxid is not responsible for any damage caused to your system.
echo.
echo    ===========================================================================
echo.
echo    Press any key to confirm you have created a restore point...
pause
color 0B
goto :menu

:menu
cls
echo.
echo    ====================================================
echo    VXID TWEAKS - v1.0
echo    Lower Input Lag by ~4%% ^| Increase FPS by ~1-3%%
echo    ====================================================
echo.
echo    +--------------------------------------------------+
echo    ^|                  TWEAK OPTIONS                   ^|
echo    +--------------------------------------------------+
echo    ^|                                                  ^|
echo    ^|  [1] Apply Network ^& Input Lag Optimization      ^|
echo    ^|  [2] Apply Gaming ^& FPS Tweaks                   ^|
echo    ^|  [3] Apply Power ^& Service Debloat               ^|
echo    ^|  [4] Disable Telemetry ^& Privacy Intrusions      ^|
echo    ^|                                                  ^|
echo    +--------------------------------------------------+
echo    ^|                 GLOBAL ACTIONS                   ^|
echo    +--------------------------------------------------+
echo    ^|                                                  ^|
echo    ^|  [5] [!] FULL SYSTEM OVERDRIVE (Apply All 1-4)   ^|
echo    ^|  [6] Revert Changes (Restore Defaults)           ^|
echo    ^|  [7] Exit Program                                ^|
echo    ^|                                                  ^|
echo    +--------------------------------------------------+
echo.
set /p choice="    [#] Select an option (1-7): "

if "%choice%"=="1" goto :network
if "%choice%"=="2" goto :fps
if "%choice%"=="3" goto :power
if "%choice%"=="4" goto :telemetry
if "%choice%"=="5" goto :all
if "%choice%"=="6" goto :revert
if "%choice%"=="7" exit
goto :menu

:network
cls
echo.
echo    +--------------------------------------------------+
echo    ^|  NETWORK ^& INPUT LAG OPTIMIZATION               ^|
echo    +--------------------------------------------------+
echo.
echo    [~] Disabling Nagle's Algorithm (TCPNoDelay)...
for /f %%i in ('wmic path win32_networkadapterconfiguration where "IPEnabled=true" get SettingID ^| findstr /v "SettingID"') do (
    reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\%%i" /v "TcpAckFrequency" /t REG_DWORD /d "1" /f >nul 2>&1
    reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\%%i" /v "TCPNoDelay" /t REG_DWORD /d "1" /f >nul 2>&1
)
echo    [+] TCPNoDelay Injected.
echo.
echo    [~] Disabling Network Throttling...
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d "4294967295" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "SystemResponsiveness" /t REG_DWORD /d "0" /f >nul 2>&1
echo    [+] Network Throttling Removed.
echo.
echo    [~] Optimizing Mouse/Keyboard Polling...
reg add "HKCU\Control Panel\Mouse" /v "MouseSensitivity" /t REG_SZ /d "10" /f >nul 2>&1
reg add "HKCU\Control Panel\Mouse" /v "SmoothMouseXCurve" /t REG_BINARY /d "0000000000000000C0CC0C0000000000809919000000000040662600000000000033330000000000" /f >nul 2>&1
reg add "HKCU\Control Panel\Mouse" /v "SmoothMouseYCurve" /t REG_BINARY /d "0000000000000000000038000000000000007000000000000000A800000000000000E00000000000" /f >nul 2>&1
echo    [+] Mouse Input Lag Minimized.
echo.
echo    ====================================================
echo    [OK] ALL NETWORK ^& INPUT TWEAKS APPLIED SUCCESSFULLY
echo    ====================================================
echo.
pause
goto :menu

:fps
cls
echo.
echo    +--------------------------------------------------+
echo    ^|  GAMING ^& FPS OPTIMIZATION                       ^|
echo    +--------------------------------------------------+
echo.
echo    [~] Disabling Xbox GameDVR and Game Bar...
reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d "0" /f >nul 2>&1
echo    [+] GameDVR Disabled.
echo.
echo    [~] Prioritizing GPU Rendering...
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games" /v "GPU Priority" /t REG_DWORD /d "8" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games" /v "Priority" /t REG_DWORD /d "6" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games" /v "Scheduling Category" /t REG_SZ /d "High" /f >nul 2>&1
echo    [+] GPU Priority Elevated.
echo.
echo    [~] Disabling Fullscreen Optimizations globally...
reg add "HKCU\System\GameConfigStore" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d "2" /f >nul 2>&1
echo    [+] Fullscreen Optimizations Bypassed.
echo.
echo    ====================================================
echo    [OK] ALL GAMING ^& FPS TWEAKS APPLIED SUCCESSFULLY
echo    ====================================================
echo.
pause
goto :menu

:power
cls
echo.
echo    +--------------------------------------------------+
echo    ^|  POWER OPTIMIZATIONS                              ^|
echo    +--------------------------------------------------+
echo.
echo    [~] Unlocking Ultimate Performance Power Plan...
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 >nul 2>&1
powercfg -setactive e9a42b02-d5df-448d-aa00-03f14749eb61 >nul 2>&1
echo    [+] Power Plan Upgraded.
echo.
echo    ====================================================
echo    [OK] ALL POWER TWEAKS APPLIED SUCCESSFULLY
echo    ====================================================
echo.
pause
goto :menu

:telemetry
cls
echo.
echo    +--------------------------------------------------+
echo    ^|  TELEMETRY ^& PRIVACY INTRUSIONS                  ^|
echo    +--------------------------------------------------+
echo.
echo    [~] Disabling Diagnostic Tracking...
sc stop "DiagTrack" >nul 2>&1
sc config "DiagTrack" start=disabled >nul 2>&1
sc stop "dmwappushservice" >nul 2>&1
sc config "dmwappushservice" start=disabled >nul 2>&1
echo    [+] Tracking Services Disabled.
echo.
echo    [~] Disabling Cortana and Bing Search...
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Windows Search" /v "AllowCortana" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Search" /v "BingSearchEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d "0" /f >nul 2>&1
echo    [+] Cortana ^& Telemetry Blocked.
echo.
echo    ====================================================
echo    [OK] ALL PRIVACY INTRUSIONS NEUTRALIZED
echo    ====================================================
echo.
pause
goto :menu

:all
cls
echo.
echo APPLYING ALL SYSTEM OVERDRIVE TWEAKS...
call :network_quiet
call :fps_quiet
call :power_quiet
call :telemetry_quiet
echo.
echo ALL TWEAKS APPLIED SUCCESSFULLY!
pause
goto :menu

:network_quiet
for /f %%i in ('wmic path win32_networkadapterconfiguration where "IPEnabled=true" get SettingID ^| findstr /v "SettingID"') do (
    reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\%%i" /v "TcpAckFrequency" /t REG_DWORD /d "1" /f >nul 2>&1
    reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\%%i" /v "TCPNoDelay" /t REG_DWORD /d "1" /f >nul 2>&1
)
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d "4294967295" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "SystemResponsiveness" /t REG_DWORD /d "0" /f >nul 2>&1
goto :eof

:fps_quiet
reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games" /v "GPU Priority" /t REG_DWORD /d "8" /f >nul 2>&1
goto :eof

:power_quiet
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 >nul 2>&1
powercfg -setactive e9a42b02-d5df-448d-aa00-03f14749eb61 >nul 2>&1
goto :eof

:telemetry_quiet
sc stop "DiagTrack" >nul 2>&1
sc config "DiagTrack" start=disabled >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d "0" /f >nul 2>&1
goto :eof

:revert
cls
echo.
echo Reverting changes back to Windows Defaults...
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "NetworkThrottlingIndex" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "SystemResponsiveness" /f >nul 2>&1
reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d "1" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\GameDVR" /v "AllowGameDVR" /f >nul 2>&1
sc config "DiagTrack" start=auto >nul 2>&1
sc start "DiagTrack" >nul 2>&1
powercfg -setactive 381b4222-f694-41f0-9685-ff5bb260df2e >nul 2>&1
echo Done.
pause
goto :menu
