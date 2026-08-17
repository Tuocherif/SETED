@echo off
chcp 65001 >nul
cd /d "%~dp0"

set "LOG=%~dp0.publication.log"
set "MSG=%~1"
if "%MSG%"=="" set "MSG=Mise a jour du site SETED"

echo === Publication SETED === > "%LOG%"
echo Date : %DATE% %TIME% >> "%LOG%"
echo Message : %MSG% >> "%LOG%"
echo. >> "%LOG%"

git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
  echo [ERREUR] Ce dossier n'est pas un depot Git. >> "%LOG%"
  echo RESULTAT=ERREUR_DEPOT >> "%LOG%"
  exit
)

git add -A >> "%LOG%" 2>&1

git diff --cached --quiet
if errorlevel 1 (
  git commit -m "%MSG%" >> "%LOG%" 2>&1
) else (
  echo [INFO] Aucune modification a committer. >> "%LOG%"
)

echo. >> "%LOG%"
echo --- Envoi vers GitHub --- >> "%LOG%"
git push origin main >> "%LOG%" 2>&1
if errorlevel 1 (
  echo RESULTAT=ECHEC >> "%LOG%"
) else (
  echo RESULTAT=OK >> "%LOG%"
)

echo. >> "%LOG%"
echo --- Dernier commit --- >> "%LOG%"
git log --oneline -1 >> "%LOG%" 2>&1
exit
