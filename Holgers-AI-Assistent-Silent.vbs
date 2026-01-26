Set WshShell = CreateObject("WScript.Shell")

' Pfad zur BAT-Datei (im gleichen Ordner)
BatFile = WshShell.CurrentDirectory & "\Holgers-AI-Assistent.bat"

' BAT ausführen ohne CMD-Fenster
WshShell.Run chr(34) & BatFile & Chr(34), 0
Set WshShell = Nothing
