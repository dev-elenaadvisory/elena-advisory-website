Get-Content elena-advisory.html | Select-Object -Skip 9 -First 342 | Set-Content styles.css -Encoding UTF8
Get-Content elena-advisory.html | Select-Object -Skip 673 -First 52 | Set-Content script.js -Encoding UTF8
Get-Content elena-advisory.html | Select-Object -Skip 354 -First 318 | Set-Content temp_body.html -Encoding UTF8

$head = Get-Content index.html -Raw
$headStr = ($head -split '<body')[0]

$fontOld = '<link href="https://fonts.googleapis.com/css2\?family=Inter.*?rel="stylesheet">'
$fontNew = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@400;500&family=EB+Garamond:ital,wght@0,400;1,400&display=swap" rel="stylesheet">'
$headStr = $headStr -replace $fontOld, $fontNew

$titleOld = '<title>.*?</title>'
$titleNew = '<title>Elena Advisory — Your Future in America, By Design</title>'
$headStr = $headStr -replace $titleOld, $titleNew

Set-Content temp_head.html $headStr -NoNewline -Encoding UTF8
Get-Content temp_head.html | Set-Content index.html -Encoding UTF8
Add-Content index.html "<body>"
Get-Content temp_body.html | Add-Content index.html
Add-Content index.html "    <!-- JavaScript -->"
Add-Content index.html "    <script src=`"script.js`" defer></script>"
Add-Content index.html "</body>"
Add-Content index.html "</html>"

if (Test-Path temp_body.html) { Remove-Item temp_body.html }
if (Test-Path temp_head.html) { Remove-Item temp_head.html }
if (Test-Path do_split.py) { Remove-Item do_split.py }
