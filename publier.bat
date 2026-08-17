@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo =============================================
echo    Publication du site SETED sur GitHub
echo    https://github.com/Tuocherif/SETED
echo =============================================
echo.

git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
  echo [ERREUR] Ce dossier n'est pas un depot Git.
  echo Verifiez que le dossier .git est bien present.
  echo.
  pause
  exit /b 1
)

git add -A

git diff --cached --quiet
if not errorlevel 1 goto envoi

set "MSG=%~1"
if "%MSG%"=="" set /p MSG=Decrivez la modification (ou Entree) : 
if "%MSG%"=="" set "MSG=Mise a jour du site"
git commit -m "%MSG%"
echo.

:envoi
echo Envoi vers GitHub...
echo.
git push -u origin main
if errorlevel 1 (
  echo.
  echo [ECHEC] L'envoi n'a pas abouti.
  echo.
  echo   - Premiere utilisation : une fenetre de connexion GitHub doit
  echo     s'ouvrir dans votre navigateur. Connectez-vous, puis relancez
  echo     ce fichier. Windows retiendra vos identifiants ensuite.
  echo   - Sinon : verifiez votre connexion internet.
  echo.
) else (
  echo.
  echo [OK] Site publie avec succes.
  echo.
  echo   Adresse : https://tuocherif.github.io/SETED/
  echo   Comptez 1 a 2 minutes avant de voir la mise a jour.
  echo.
)
pause
